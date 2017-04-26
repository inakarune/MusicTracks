var userController = require('../controllers/userController');
var fileController = require('../controllers/fileController');
var cartController = require('../controllers/cartController');
var verifyToken = require('../middlewares/jwt');

module.exports = function(app){
  
  app.post('/login', userController.login);
  app.get('/getUserInfo', verifyToken, userController.getUserInfo);
 
  app.get('/cart', verifyToken, cartController.cart);
  app.get('/cart/:item', verifyToken, cartController.cart_item);
  app.delete('/cart/:item', verifyToken, cartController.cart_delete);

  app.post('/upload', verifyToken, fileController.uploadFile);
  app.get('/download', verifyToken, fileController.downloadFile);
  app.get('/search/:keyword/:condition', fileController.searchFile);
  app.get('/discover', fileController.discoverFile);
  app.get('/chart', fileController.chartFile);
  app.get('/getUploadedSongList', verifyToken, fileController.getUploadedFileList);
  app.put('/count/:title', fileController.addCount);
};
