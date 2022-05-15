var express = require('express');
var router = express.Router();

var users = {};

router.post('/', function (req, res, next) {
    console.log(req.body);
    next();
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
    if (req.body.username in users && users[req.body.username]['password'] === req.body.password) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

router.post('/signup', (req, res, next) => {
    if (!(req.body.username in users)) {
        users[req.body.username] = req.body;
        console.log(users);
        res.sendStatus(200);
    } else { // username already exists
        res.sendStatus(409);
    }
});

module.exports = router;
