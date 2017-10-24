import winston from "winston";

winston.emitErrs = true;
const tsFormat = () => (new Date().toLocaleString());
const log = new winston.Logger({
	transports: [
		// new winston.transports.File({
		// 	level: 'info',
		// 	filename: './all-logs.log',
		// 	handleExceptions: true,
		// 	json: true,
		// 	maxsize: 5242880, //5MB
		// 	maxFiles: 5,
		// 	colorize: false
		// }),
		new (winston.transports.Console)({
			colorize: true,
			json: false,
			prettyPrint: true,
			handleExceptions: true,
			timestamp: tsFormat,
			level: 'info'
		})
	],
	exitOnError: false
});

if (process.env.NODE_ENV !== 'production') {
	log.add(new winston.transports.Console({
		colorize: true,
		json: false,
		prettyPrint: true,
		handleExceptions: true,
		timestamp: tsFormat,
		//label: module.filename.split('/').slice(-2).join('/'),
		level: 'debug'
	}));
}

module.exports = log;
module.exports.stream = {
	write: function (message, encoding) {
		log.debug(message.trim());
	}
};





