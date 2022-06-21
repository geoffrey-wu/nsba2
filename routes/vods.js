var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('vods', {
        title: 'NSBA',
        username: req.session.username
    });
});

module.exports = router;
