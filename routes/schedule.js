var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render('schedule', {
        title: 'NSBA',
        username: req.session.username,

        schedule: await database.getSchedule()
    });
});

module.exports = router;
