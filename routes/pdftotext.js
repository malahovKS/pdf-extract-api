import log from "../libs/log";
import multer from "multer";
import {unlink} from "fs";
import commandExists from "command-exists";
import util from "util";
import {exec} from "child_process";

const upload = multer({dest: 'public/uploads/'}).single('pdf');
const execPdftotxt = util.promisify(exec);
const fsUnlink = util.promisify(unlink);

module.exports = app => {

	/**
	 * @api {post} /api/pdftotext pdf file to text/plain
	 * @apiParam {multipart/form-data} pdf pdf file
	 * @apiGroup Convert
	 * @apiSuccess {text/plain} body raw text
	 */
	app.post("/api/pdftotext", upload, (req, res) => {

		log.debug(req.headers);

		if (!req.file) {
			log.error("Cannot read property 'originalname' of undefined");
			return res.status(400).send("Cannot read property 'originalname' of undefined");
		}

		if (req.file.originalname.toLowerCase().indexOf(".pdf") === -1) {
			log.error("Uploaded filename: " + req.file.originalname);
			fsUnlink(req.file.path)
				.then(() => {
					log.debug(req.file.originalname + " deleted.");
				}).catch((error) => {
				log.error(error);
				return res.sendStatus(500);
			});
			return res.status(400).send("Wrong file type");
		}

		commandExists('pdftotext')
			.then(() => {
				execPdftotxt("pdftotext -layout -nopgbrk -raw -eol unix " + req.file.path + " -", {maxBuffer: 3000 * 1024})
					.then(result => {
						log.debug(req.file.originalname + " Done!");
						log.debug("\n" + result);
						fsUnlink(req.file.path)
							.then(() => {
								log.debug(req.file.originalname + " deleted.");
							}).catch((error) => {
							log.error(error);
							return res.sendStatus(500);
						});
						res.type('text/plain');
						res.status(200).send(result.stdout.trim());
						res.flush();
					}).catch((error) => {
					fsUnlink(req.file.path)
						.then(() => {
							log.debug(req.file.originalname + " deleted.");
						}).catch((error) => {
						log.error(error);
						return res.sendStatus(500);
					});
					log.error(error);
					return res.sendStatus(500);
				});
			}).catch(() => {
			fsUnlink(req.file.path)
				.then(() => {
					log.debug(req.file.originalname + " deleted.");
				}).catch((error) => {
				log.error(error);
				return res.sendStatus(500);
			});
			log.error("Command pdftotext doesn't exist on the server");
			return res.sendStatus(500);
		});

	});
};
