
const purchaseController = require('../db/purchase/purchaseController.js');
const songController = require('../db/song/songController.js');
const userController = require('../db/user/userController.js');

module.exports = function(app){

	app.get('/', function(req, res){
		
	})
	
	app.get('/download', function(req, res){

	});
	
	app.get('/search', function(req, res){

	});

	app.get('/artistView', function(req, res){

	});

	app.get('/chart', function(req, res){

	});

	app.get('/artistInfo');

	app.get('/userInfo');

	app.get('/userInfo/cart');

	app.get('/auth/google');

	app.get('/auth/google/callback');

	app.get('/logout');

	app.get('/artistPage');

	app.get('/cart');





	// post --------------------------------


	app.post('/signup', function(req, res){

	});

	app.post('/upload', function(req, res){

	});

	app.post('/login', function(req, res){

	});

	app.post('/userInfo/cart')
}