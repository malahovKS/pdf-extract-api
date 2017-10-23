import log from "../libs/log";
import multer from "multer";
import fs from "fs";
import * as PDFTOTEXT from "child_process";

const UPLOAD = multer({dest: 'public/uploads/'}).single('pdf');

module.exports = app => {

	app.get("/api/pdftotext", (req, res) => {
		res.json({status: "PDF to Text API"});
		res.flush(); //TODO review this
	});

	app.post("/api/pdftotext", UPLOAD, (req, res) => {

		log.debug(req.headers);

		if (req.file.originalname.toLowerCase().indexOf(".pdf") === -1) {
			res.sendStatus(400);
			fs.unlink(req.file.path);
			return log.error("400 Error: File upload only supports .pdf filetype");
		}

		PDFTOTEXT.exec("pdftotext -layout -nopgbrk -raw -eol unix " + req.file.originalname, (error, stdout, stderr) => {

			if (error) {
				fs.unlink(req.file.path);
				res.sendStatus(500);
				log.error(error);
				return log.error(stderr);
			}



		})


	});
};