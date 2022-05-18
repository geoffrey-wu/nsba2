var express = require('express');
var router = express.Router();

var authentication = require('../authentication');

/* GET home page. */
router.get('/', async (req, res, next) => {
    // don't show login page if you're already logged in
    if (req.session && authentication.checkToken(req.session.username, req.session.token)) {
        res.redirect('/');
    } else {
        res.render('login', {
            title: 'Login'
        });
    }
});

module.exports = router;
