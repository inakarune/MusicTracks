var AWS = require('aws-sdk');
var formidable = require('formidable');
var fs = require('fs');
var Song = require('../models/song');
var mm = require('musicmetadata');
var jwt = require('jsonwebtoken');
var tokenConfig = require('../config/token');

AWS.config.loadFromPath('./config/credentials.json');

var s3 = new AWS.S3();
var bucketName = 'test-uphere';

var downloadFile = function (req, res) {
  var path = req.params.filename;
  var file = fs.createWriteStream(path);
  var params = {
    Bucket: bucketName,
    Key: path
  };

  s3.getObject(params).createReadStream().pipe(file);
};

var uploadFile = function (req, res) {
  var count = 0;
  var form = new formidable.IncomingForm();
  form.multiples = true;
  var authorizationHeader = req.headers['authorization'];
  var token = authorizationHeader.split(' ')[1];
  var userEmail = null;
  jwt.verify(token, tokenConfig, function (err, decodedToken) {
      if (err) {
        return res.sendStatus(403);
      }
      userEmail = decodedToken.email;
  });

  form.parse(req, function (err, fields, files) {
    files.userfile.forEach(file => {
      var keyName = file.name;
      var params = {
        Bucket: bucketName,
        Key: keyName,
        ACL: 'public-read',
        Body: fs.createReadStream(file.path)
      };

      Song.findOne({ filename: file.name }, function (err, song) {
        if (err) {
          return res.status(500).send(err);
        }

        if (song) {
          return res.end(JSON.stringify({message: 'success upload!'}));   
        }
      });

      s3.upload(params, function (err, data) {
        var readableStream = fs.createReadStream(file.path);
        var parser = mm(readableStream, function (err, metadata) {
          if (err) return res.json(err);

          var imgName = metadata.title + '.' + metadata.picture[0].format;
          var imgParams = {
            Bucket: bucketName,
            Key: imgName,
            ACL: 'public-read',
            Body: metadata.picture[0].data
          };
          
          s3.upload(imgParams, function (err, imgdata) {
            var song = new Song({
              title: metadata.title,
              artist: metadata.artist[0],
              album: metadata.album,
              year: metadata.year,
              filename: data.Location,
              picture: imgdata.Location,
              user: userEmail
            });

            song.save(function (err, songInfo) {
              ++count;
              if (count === files.userfile.length) {
                return res.end(JSON.stringify({message: 'success upload!'}));
              }
            });
          });
          
        });
        console.log('Successfully uploaded data to ' + bucketName + "/" + keyName);
        
      });
    });
  });
};

var searchFile = function (req, res) {
  var keyword = req.query.keyword.split('.')[0];
  var condition = req.query.condition;
  var query = {};

  if (condition === 'title') {
    query['title'] = { $regex : keyword, $options: 'ix' }
  } else if (condition === 'album') {
    query['album'] = { $regex : keyword, $options: 'ix' }
  } else if (condition === 'artist') {
    query['artist'] = { $regex : keyword, $options: 'ix' }
  }

  Song.find(query)
    .then(function (data) {
      res.status(200).send(data);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
};

var discoverFile = function (req, res) {
  Song.find({}, function (err, data) {
    if (err) throw err;
    res.status(200).send(data);
  });
};

var chartFile = function (req, res) {
  Song.find({}, function (err, data) {
    res.status(200).send(data);
  });
};

var getUploadedFileList = function (req, res) {
  var authorizationHeader = req.headers['authorization'];
  var token = authorizationHeader.split(' ')[1];
  var userEmail = null;
  jwt.verify(token, tokenConfig, function (err, decodedToken) {
      if (err) {
        return res.sendStatus(403);
      }
      userEmail = decodedToken.email;
      
      Song.find({ user: userEmail }, function (err, data) {
        if (err) throw err;
        res.status(200).send(data);
      });
  });
};

var addCount = function (req, res) {
  var query = { "title": req.query.title };
  Song.findOneAndUpdate(query, { $inc: { "click": 1 }}, function (err, data) {
    res.status(201).send('add success.');
  });
};

module.exports = {
  downloadFile: downloadFile,
  uploadFile: uploadFile,
  searchFile : searchFile,
  discoverFile: discoverFile,
  chartFile: chartFile,
  getUploadedFileList: getUploadedFileList,
  addCount: addCount
};
