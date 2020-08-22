const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes');

router
  .get('/', notesController.getAll);

router
  .get('/:noteId', notesController.get)
  .put('/:noteId', notesController.put);

module.exports = router;
