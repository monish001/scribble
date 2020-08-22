const express = require('express');
const app = express();
app.locals.notes = app.locals.notes || {};

function initIfNotExists(id) {
    app.locals.notes[id] = app.locals.notes[id] || { id, text: 'default', createAt: new Date().toISOString() };
}

const get = function (filters) {
    const { id } = filters;
    initIfNotExists(id);
    return app.locals.notes[id];
}

const put = function ({ id, note: { text } }) {
    initIfNotExists(id);
    app.locals.notes[id]['text'] = text;
    return app.locals.notes[id];
}

module.exports = {
    get, put
}
