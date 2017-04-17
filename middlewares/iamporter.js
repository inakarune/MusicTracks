var config = require('../config/config');
var { Iamporter, IamporterError } = require('iamporter');

var iamporter = new Iamporter({
  apiKey: config.apiKey,
  secret: config.secret
});

module.exports = iamporter;
