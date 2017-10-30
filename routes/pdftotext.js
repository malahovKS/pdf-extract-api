import log from "../libs/log";
import multer from "multer";
import fs from "fs";
import * as PDFTOTEXT from "child_process";
import commandExists from "command-exists";

const UPLOAD = multer({dest: 'public/uploads/'}).single('pdf');

module.exports = app => {

	/**
	 * @api {post} /api/pdftotext pdf file to text/plain
	 * @apiParam {multipart/form-data} pdf pdf file
	 * @apiGroup Convert
	 * @apiSuccess {text/plain} body raw text
	 */
	app.post("/api/pdftotext", UPLOAD, (req, res) => {

		log.debug(req.headers);

		if (req.file.originalname.toLowerCase().indexOf(".pdf") === -1) {
			res.sendStatus(400);
			fs.unlink(req.file.path);
			return log.error("400 Error: File upload only supports .pdf filetype");
		}


		commandExists('pdftotext')
			.then(() => {
				PDFTOTEXT.exec("pdftotext -layout -nopgbrk -raw -eol unix " + req.file.path + " -", {maxBuffer: 3000 * 1024},
					(error, stdout, stderr) => {

						if (error) {
							fs.unlink(req.file.path);
							res.sendStatus(500);
							log.error(error);
							return log.error(stderr);
						}

						log.info(req.file.originalname + " Done!");
						log.debug("\n" + stdout);

						fs.unlink(req.file.path);
						res.type('text/plain');
						res.status(200).send(stdout.trim());
						res.flush();

					})
			}).catch(() => {
			fs.unlink(req.file.path);
			res.sendStatus(500);
			return log.error("500 Error: Command pdftotext doesn't exist");
		});
	});
};