const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const commonRouter = require('./routes/common');
const notesRouter = require('./routes/notes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "../client/build"), { index: false }));

app.use('/api/notes', notesRouter);
app.use('/api/common', commonRouter);

app.use('/api/*', (req, res, next) => {
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
