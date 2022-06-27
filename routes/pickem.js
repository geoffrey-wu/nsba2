var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('pickem', {
        title: 'NSBA',
        username: req.session.username
    });
});

module.exports = router;
