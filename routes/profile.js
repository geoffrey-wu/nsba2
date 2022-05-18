var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var database = require('../database');

router.get('/', async (req, res, next) => {
    let username = req.session.username;
    let token = req.session.token;
    
    if (authentication.checkToken(username, token)) {
        let user = await database.getUser(username);
        if (user) {
            res.render('profile', {
                title: username,
                role: user.role,
                user: user,
                username: req.session.username
            });
        } else {
            res.status(404).render('error', {
                message: 'Player not found',
                error: {
                    status: 404,
                    stack: req.url
                }
            });
        }
    } else {
        res.redirect('/');
    }
});


module.exports = router;