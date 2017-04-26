var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Song = new Schema({
  title : {
    type : String, required: true
  },
  album : {
    type : String, default: ''
  },
  artist : {
    type : String, default: ''
  },
  albumartist: {
    type : String, default: ''
  },
  price : {
    type : Number, default: 1000
  },
  created_at : { type: Date },
  year : {
    type: String, default: '정보없음'
  },
  picture: {
    type: String, default: ''
  },
  filename: {
    type : String, default: ''
  },
  user : String,
  click: {
    type: Number, default: 0
  }
});

module.exports = mongoose.model('Song', Song);
