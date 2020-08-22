const notesModel = require('../models/notes');

const get = function (filters) {
    return notesModel.get(filters);
}

const put = function ({ id, note }) {
    return notesModel.put({ id, note });
}


module.exports = {
    get, put
}
