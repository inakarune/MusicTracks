var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config/config');
var userController = require('../controllers/userController'); 

module.exports = function (app) {
  
  app.use(require('./cors'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser('hdiaf9df2394739djkfhds'));
  // passport.serializeUser(function(user, done){
  // done(null, user);
  // });
  // passport.deserializeUser(function(obj, done){
  //   done(null, obj);
  // });
  // passport.use(new GoogleStrategy({
  //     clientID: config.googleID,
  //     clientSecret: config.googleSecret,
  //     callbackURL: "http://localhost:8080/auth/google/callback"
  //   },
  //   function(accessToken, refreshToken, profile, done) {
  //     // asynchronous verification, for effect...
  //     process.nextTick(function () {
  //       // To keep the example simple, the user's Google profile is returned to
  //       // represent the logged-in user.  In a typical application, you would want
  //       // to associate the Google account with a user record in your database,
  //       // and return that user instead.
  //       return done(null, profile);
  //     });
  //   }
  // ));
  // app.use(passport.initialize());
  // app.use(passport.session());

  // app.use(function(req, res, next){
  //   res.header('Access-Control-Allow-Origin', 'localhost:8080');
  //   res.header('Access-Control-Allow-Headers', 'X-Requested-With', 'Content-Type, Authorization, x-access-token');
  //   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  // });
  
};
