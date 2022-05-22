var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render('mock-draft', {
        title: 'NSBA',
        username: req.session.username,

        players: await database.getMockDraft()
    });
});

module.exports = router;
