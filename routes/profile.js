var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('profile',
        {
            firstName: 'Geoffrey',
            title: 'profile',
            username: req.query.username
        }
    );
});

module.exports = router;
