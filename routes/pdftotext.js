import log from "../libs/log";
import multer from "multer";
import fs from "fs";
import commandExists from "command-exists";
import util from "util";
import {exec} from "child_process";

const UPLOAD = multer({dest: 'public/uploads/'}).single('pdf');
const EXEC = util.promisify(exec);
const UNLINK = util.promisify(fs.unlink);

module.exports = app => {

	/**
	 * @api {post} /api/pdftotext pdf file to text/plain
	 * @apiParam {multipart/form-data} pdf pdf file
	 * @apiGroup Convert
	 * @apiSuccess {text/plain} body raw text
	 */
	app.post("/api/pdftotext", UPLOAD, (req, res) => {

		log.debug(req.headers);

		if (!req.file) {
			log.error("400 Error: Cannot read property 'originalname' of undefined");
			return res.status(400).send("Cannot read property 'originalname' of undefined");
		}

		if (req.file.originalname.toLowerCase().indexOf(".pdf") === -1) {
			log.error("400 Error: File upload only supports .pdf file type");
			UNLINK(req.file.path)
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
				EXEC("pdftotext -layout -nopgbrk -raw -eol unix " + req.file.path + " -", {maxBuffer: 3000 * 1024})
					.then(result => {
						log.debug(req.file.originalname + " Done!");
						log.debug("\n" + result);
						UNLINK(req.file.path)
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
					UNLINK(req.file.path)
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
			UNLINK(req.file.path)
				.then(() => {
					log.debug(req.file.originalname + " deleted.");
				}).catch((error) => {
				log.error(error);
				return res.sendStatus(500);
			});
			log.error("Command pdftotext doesn't exist");
			return res.sendStatus(500);
		});

	});
};

/*

		// commandExists('pdftotext')
		// 	.then(() => {
		// 		exec("pdftotext -layout -nopgbrk -raw -eol unix " + req.file.path + " -", {maxBuffer: 3000 * 1024},
		// 			(error, stdout, stderr) => {
		//
		// 				if (error) {
		// 					fs.unlink(req.file.path);
		// 					res.sendStatus(500);
		// 					log.error(error);
		// 					return log.error(stderr);
		// 				}
		//
		// 				log.info(req.file.originalname + " Done!");
		// 				log.debug("\n" + stdout);
		//
		// 				fs.unlink(req.file.path);
		// 				res.type('text/plain');
		// 				res.status(200).send(stdout.trim());
		// 				res.flush();
		//
		// 			})
		// 	}).catch(() => {
		// 	fs.unlink(req.file.path);
		// 	log.error("Command pdftotext doesn't exist");
		// 	return res.sendStatus(500);
		// });
*/
