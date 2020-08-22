const express = require('express');
const app = express();
app.locals.notes = app.locals.notes || {};

function initIfNotExists(id) {
    if (!app.locals.notes[id]) {
        app.locals.notes[id] = {
            id,
            text: '',
            createdAt: new Date().toISOString()
        };
        setTimeout(() => {
            console.log("Deleting ", id);
            delete app.locals.notes[id];
            console.log("Deleted ", id);
        }, 1000 * 86400);
    }
}

const getAll = function () {
    return app.locals.notes;
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
    getAll, get, put
}
