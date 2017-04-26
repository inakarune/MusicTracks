const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const port = 5000;

app.use(session({
	secret : '123552dehisdfkcn',
	resave : false,
	saveUninitialized : true
}));

app.use('/', express.static(__dirname + '/dist'));

require('./database').connect('mongodb://heroku_14vbhjzw:lnbev4cu8oomejk831dltmf6cq@ds163020.mlab.com:63020/heroku_14vbhjzw');

require('./middlewares')(app);

require('./config/routes')(app);

app.listen(process.env.PORT || port, () => console.log('Express listening on port', port))

module.exports = app;
