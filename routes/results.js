var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('results', { 
        title: 'Results',
        username: req.session.username
    });
});

module.exports = router;
