var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('rules', {
        title: 'Rules',
        username: req.session.username
    });
});

module.exports = router;
