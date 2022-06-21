var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile(req.rootPath + '/public/stylesheets' + req.originalUrl);
});

module.exports = router;
