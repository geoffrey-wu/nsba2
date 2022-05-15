var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(req.rootPath + '/public/images' + req.originalUrl);
});

module.exports = router;
