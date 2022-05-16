var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('profile',
        {
            user: database.getUsers()[req.query.username],
            // firstName: 'Geoffrey',
            title: 'profile',
            // username: req.query.username
        }
    );
});

module.exports = router;
