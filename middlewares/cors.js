var allowCORS = function (req, res, next) {

  var allowedOrigins = [
    'http://localhost:8080',
    'http://accounts.google.com',
    'https://www.googleapis.com/'
  ];
  var origin = req.headers.origin;

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token');
     res.setHeader('Access-Control-Allow-Credentials', true);
  if ('OPTIONS' === req.method) {
    res.send(200);
    return;
  }
  return next();
};

module.exports = allowCORS;
