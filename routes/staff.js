var express = require('express');
var router = express.Router();

router.get(/\/.+/, async (req, res, next) => {
    let staffName = decodeURI(req.url.substring(1));
    if (staffName.charAt(staffName.length - 1) === '/')
        staffName = staffName.substring(0, staffName.length - 1);

    let player = await database.getUser(staffName, role = 'Admin', project = {});
    if (player) {
        res.render('user', {
            title: staffName,
            username: req.session.username,

            results: await database.getResults(),
            user: player
        });
    } else {
        next(createError(404));
    }
});

router.get('/', function (req, res, next) {
    res.render('staff', {
        title: 'Staff',
        username: req.session.username
    });
});

module.exports = router;
