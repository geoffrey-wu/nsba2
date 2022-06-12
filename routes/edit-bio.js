var express = require('express');
var router = express.Router();
var createError = require('http-errors');

var authentication = require('../authentication');
var database = require('../database');

router.get('/', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;

    if (authentication.checkToken(username, token)) {
        let player = await database.getUser(username);
        if (player) {
            res.render('edit-bio', {
                title: 'Edit Bio',
                username: req.session.username,

                user: player
            });
        } else {
            next(createError(404));
        }
    } else {
        res.redirect('/');
    }
});


module.exports = router;