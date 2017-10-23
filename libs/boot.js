import log from "./log.js";

module.exports = app => {
	app.listen(app.get("port"), () => {
		log.info(`PDF extract API - Port ${app.get("port")}`);
	});
};