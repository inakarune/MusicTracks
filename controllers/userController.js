var User = require('../models/user');
var jwt = require('jsonwebtoken');
var tokenConfig = require('../config/token');

function createToken (email) {
  return jwt.sign({ email: email }, tokenConfig, {
    expiresIn: 2880
  });
}

var login = function (req, res) {
  var accessToken = null;
  var user = new User({
    name: req.body.name,
    email: req.body.email
  });
  var query = { email: req.body.email };

  User.findOne(query, function (err, founduser) {
    if (err) {
      return res.status(500).send(err);
    } 

    if (!founduser) {
      user.save(function (err, userInfo) {
        if (err) {
          res.sendStatus(500);
        }

        accessToken = createToken(req.body.email);

        res.status(201).send({
          accessToken: accessToken
        });
        
      });
    } else {
      accessToken = createToken(req.body.email);
      res.status(201).send({
          accessToken: accessToken
      });
    }
  });
};

var logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

var getUserInfo = function (req, res) {
  var authorizationHeader = req.headers['authorization'];
  var token = authorizationHeader.split(' ')[1];
  var userEmail = null;

  jwt.verify(token, tokenConfig, function (err, decodedToken) {
      if (err) {
        return res.sendStatus(403);
      }
    
      userEmail = decodedToken.email;
      var query = { email: userEmail };
    
      User.findOne(query, function (err, userInfo) {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).send(userInfo);
      });
  });
};

module.exports = {
  login: login,
  logout: logout,
  getUserInfo: getUserInfo
};
