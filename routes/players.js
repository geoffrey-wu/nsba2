var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('players',
        {
            title: 'players',
            users: database.getUsers()
        }
    );
});

module.exports = router;
