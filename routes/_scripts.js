var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile(req.rootPath + '/public/javascripts' + req.originalUrl);
});

module.exports = router;
