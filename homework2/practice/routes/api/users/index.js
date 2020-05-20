var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));

module.exports = router;