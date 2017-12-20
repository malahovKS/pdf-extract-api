import log from "../libs/log";
import multer from "multer";
import {unlink, writeFile} from "fs";
import commandExists from "command-exists";
import util from "util";
import {exec} from "child_process";

const upload = multer({dest: 'public/uploads/'}).single('pdf');
const execPdftotxt = util.promisify(exec);
const fsUnlink = util.promisify(unlink);
const fsWriteFile = util.promisify(writeFile);


module.exports = app => {

	/**
	 * @api {post} /upload/v1/pdf pdf file to text/plain
	 * @apiParam {multipart/form-data} pdf pdf file
	 * @apiGroup Convert
	 * @apiSuccess {text/plain} body raw text
	 */
	app.post("/upload/v1/pdf", upload, (req, res) => {

		log.debug(req.headers);

		if (!req.file) {
			log.error("Cannot read property 'originalname' of undefined");
			return res.status(400).send("Cannot read property 'originalname' of undefined");
		}

		if (req.file.originalname.toLowerCase().indexOf(".pdf") === -1) {
			log.error("Uploaded filename: " + req.file.originalname);
			(async () => {
				await fsUnlink(req.file.path);
			})();
			return res.status(400).send("Wrong file type");
		}

		(async () => {

			try {
				await commandExists('pdftotext');
			} catch (ex) {
				log.error("Command pdftotext doesn't exist on the server");
				await fsUnlink(req.file.path);
				return res.sendStatus(500);
			}

			try {
				const result = await execPdftotxt("pdftotext -layout -nopgbrk -raw -eol unix " + req.file.path + " -", {maxBuffer: 3000 * 1024});
				await fsUnlink(req.file.path);
				res.type('text/plain');
				return res.status(200).send(result.stdout.trim());
			} catch (ex) {
				log.error(ex);
				await fsUnlink(req.file.path);
				return res.sendStatus(500);
			}

		})();

	});

	app.post("/upload/v2/pdf", (req, res) => {

		log.debug(req.headers);
		let data = new Buffer('');
		req.on('data', (chunk) => {
			data = Buffer.concat([data, chunk]);
		});
		req.on('end', () => {
			req.rawBody = data;
			(async () => {
				try {
					await fsWriteFile('./public/uploads/1.pdf', req.rawBody, 'binary');
					return res.sendStatus(200);
				} catch (ex) {
					return res.sendStatus(500);
				}
			})();
		});

	});
};
