var express = require('express');
var router = express.Router();
const ImageController = require('../controllers/image.js');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/user', require('./user'));
// multer array 추가 
router.post('/image', AuthMiddleware.checkToken, upload.array('images', 4), ImageController.array);
module.exports = router;
