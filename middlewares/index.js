var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var config = require('../config/config');
var userController = require('../controllers/userController'); 

module.exports = function (app) { 
  app.use(require('./cors'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser('hdiaf9df2394739djkfhds'));
};
