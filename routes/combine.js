var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/', async (req, res, next) => {
    res.render('combine', {
        title: 'Combine',
        username: req.session.username,

        players: await database.getUsers(role = 'Player')
    });
});

module.exports = router;
