var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/', async (req, res, next) => {
    res.render('draft-order', { 
        title: 'Draft Order',
        username: req.session.username,

        teams: await database.getTeams(),
    });
});

module.exports = router;
