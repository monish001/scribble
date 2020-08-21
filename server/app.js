var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/common');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "../client/build"), { index: false }));

app.use('/api', usersRouter);

app.use('/api', (req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

app.use('*', (req, res, next) => {
    if (!res.headersSent) {
        res.setHeader("Last-Modified", new Date().toUTCString());
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    } else {
        next();
    }
});

//code to handle all uncaughtexceptions
process.on("uncaughtException", function (err) {
    console.error({ message: "Caught exception: " + err });
});

module.exports = app;
