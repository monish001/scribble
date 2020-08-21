var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/health', function (req, res, next) {
  res.send({ uptime: process.uptime() });
});

module.exports = router;
