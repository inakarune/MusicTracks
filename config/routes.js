var userController = require('../controllers/userController');
var fileController = require('../controllers/fileController');
var cartController = require('../controllers/cartController');
var verifyToken = require('../middlewares/jwt');
// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


module.exports = function(app){
  
  app.post('/login', userController.login);
  app.get('/getUserInfo', verifyToken, userController.getUserInfo);
  // app.get('/auth/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.me https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile' }));
  // app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), userController.login);

  app.get('/cart', verifyToken, cartController.cart);
  app.get('/cart/:item', verifyToken, cartController.cart_item);
  app.delete('/cart/:item', verifyToken, cartController.cart_delete);

  app.post('/upload', verifyToken, fileController.uploadFile);
  app.get('/download', verifyToken, fileController.downloadFile);
  app.get('/search/:keyword/:condition', fileController.searchFile);
  app.get('/discover', fileController.discoverFile);
  app.get('/chart', fileController.chartFile);
  app.get('/getUploadedSongList', verifyToken, fileController.getUploadedFileList);
};
