var express = require('express');
var router = express.Router();
var createError = require('http-errors');

var authentication = require('../authentication');
var database = require('../database');

router.get('/', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;

    if (authentication.checkToken(username, token)) {
        let user = await database.getUser(username);
        if (user) {
            res.render('edit-password', {
                title: 'Edit Password',
                username: req.session.username
            });
        } else {
            res.status(404).render('error', {
                message: 'Player not found. Try clearing cookies and logging in again.',
                error: {
                    status: 404,
                    stack: req.url
                }
            });
        }
    } else {
        next(createError(401));
    }
});


module.exports = router;