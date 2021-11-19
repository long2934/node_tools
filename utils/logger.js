'use strict';

const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-daily-rotate-file');
const message = Symbol.for('message');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const jsonFormatter = (logEntry) => {
    const base = { timestamp: new Date(), path: path.basename(__dirname) + '/' + path.basename(__filename, '.js')};
    const json = Object.assign(base, logEntry);
    logEntry[message] = JSON.stringify(json);
    return logEntry;
};

const transport = new (winston.transports.DailyRotateFile)({
    level: env === 'development' ? 'debug' : 'info',
    format: winston.format(jsonFormatter)(),
    filename: process.env.LOG_FILE_PATH+'/customs-%DATE%.log',
    datePattern: 'YYYYMMDD',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '30d'
});

transport.on('rotate', (oldFilename, newFilename) => {
    // do something fun
});

let logger = winston.createLogger({
    transports: [
        transport,
        new winston.transports.Console({format: winston.format(jsonFormatter)()}),
    ],
    // format: winston.format.combine(
    //     winston.format.timestamp(),
    //     winston.format.colorize(),
    //     winston.format.json()
    // ),
});

const expLogger = expressWinston.logger({
    winstonInstance: logger,
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: (req, res) => { return false; } // optional: allows to skip some log messages based on request and/or response
});

module.exports = {
    logger: logger,
    expLogger: expLogger
};
