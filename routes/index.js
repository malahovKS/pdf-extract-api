module.exports = app => {
	/**
	 * @api {get} / API status
	 * @apiGroup Status
	 * @apiSuccess {String} status API status' message
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 OK
	 * {"status": "pdf-extract-api"}
	 */
	app.get("/", (req, res) => {
		return res.status(200).json({status: "pdf-extract-api"});
	});
};