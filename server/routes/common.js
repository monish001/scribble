const express = require('express');
const router = express.Router();

router.get('/health', function (req, res, next) {

  res.send({ uptime: `Server up since ${new Date(new Date().getTime() - process.uptime() * 1000)}` });
});

module.exports = router;
