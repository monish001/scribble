const notesService = require('../services/notes');

const get = function (req, res, next) {
    const { noteId } = req.params;
    const note = notesService.get({ id: noteId });
    res.json(note);
}

const put = function (req, res, next) {
    const { noteId } = req.params;
    const { note } = req.body;
    console.log({ body: req.body, params: req.params })
    const response = notesService.put({ id: noteId, note });
    res.json(response);
}

module.exports = {
    get,
    put
}
