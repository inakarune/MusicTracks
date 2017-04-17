var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  email: String,
  shoppingList: Array
});

module.exports = mongoose.model('User', User);
