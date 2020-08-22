const express = require('express');
const router = express.Router();

router.get('/health', function (req, res, next) {
  res.send({ uptime: process.uptime() });
});

module.exports = router;
