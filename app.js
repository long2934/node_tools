'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const expLogger = require('./utils/logger').expLogger;
const { HTTP_STATUS } = require('./utils/constant');

// routes
const statusCheck = require('./routes/status_check');
const toolsController = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expLogger);

app.use('/', statusCheck);
app.use('/tools', toolsController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).send('404 Not Found')
    /*const err = new Error('Not Found');
    err.status = HTTP_STATUS.NOT_FOUND;
    next(err);*/
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    res.send('error');
});

module.exports = app;

const server = http.createServer(app);
const port = process.env.API_PORT;
server.listen(port, () => {
    console.log(`http://localhost:${port}`)
});
