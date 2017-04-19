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

var downloadFile = function(req, res){
  var path = req.params.filename;
  var file = fs.createWriteStream(path);
  var params = {
    Bucket: bucketName,
    Key: path
  };

  s3.getObject(params).createReadStream().pipe(file);

  // var readstream = gfs.createReadStream({ filename : path });
  //   gfs.findOne({ filename : path }, function(err, file){
  //     if(err){
  //       console.log(err)
  //     } else if(!file){
  //       console.log('i am null')
  //       res.json()
  //     } else {
  //       console.log('i am not null', file)
        
      //  const iconv = new Iconv('utf-8', 'utf-8//translit//ignore');
        // const searchResult = new Buffer(file.filename);
        // var searchResultUtf8 = iconv.convert(searchResult).toString('utf-8');

        
        // var encoded = encodeURIComponent(file.filename);

        // res.writeHead(200, {
        //  'Content-Type': file.contentType,
        //  'Content-Disposition' : 'attachment; filename=' + file.filename
        // })
    //     res.set('Content-type', file.contentType);
    //     res.setHeader('Content-Disposition', 'attachment; filename="' + file.filename + '"');
    //   }
      
    // })

    // readstream.on("error", function(err){
    //   res.send("No Music found with that title");
    // });

    // readstream.pipe(res);
};

var uploadFile = function(req, res){
  var count = 0;
  var form = new formidable.IncomingForm();
  form.multiples = true;
  var authorizationHeader = req.headers['authorization'];
  var token = authorizationHeader.split(' ')[1];
  var userEmail = null;
  jwt.verify(token, tokenConfig, function(err, decodedToken){
      if(err){
        return res.sendStatus(403);
      }
      userEmail = decodedToken.email;
  });

  form.parse(req, function(err, fields, files){
    files.userfile.forEach(file => {
      var keyName = file.name;
      var params = {
        Bucket: bucketName,
        Key: keyName,
        ACL: 'public-read',
        Body: fs.createReadStream(file.path)
      };

      Song.findOne({ filename: file.name }, function(err, song){
        if(err){
          return res.status(500).send(err);
        }

        if(song){
          return res.end(JSON.stringify({message: 'success upload!'}));   
        }
      });

      s3.upload(params, function(err, data){
        // if(err) {
        //   return res.sendStatus(500);
        // }
        var readableStream = fs.createReadStream(file.path);
        var parser = mm(readableStream, function(err, metadata){
          if(err) return res.json(err);

          var imgName = metadata.title + '.' + metadata.picture[0].format;
          // image buffer convert file
          // fs.appendFileSync('uploads/' + imgName, metadata.picture[0].data);

          var imgParams = {
            Bucket: bucketName,
            Key: imgName,
            ACL: 'public-read',
            Body: metadata.picture[0].data
          };
          
          s3.upload(imgParams, function(err, imgdata){
            // var picture = {};
            // picture.data = metadata.picture[0].data;
            // picture.contentType = 'image/jpg';
            // song.picture = picture;

            // readableStream.close();
            var song = new Song({
              title: metadata.title,
              artist: metadata.artist[0],
              album: metadata.album,
              year: metadata.year,
              filename: data.Location,
              picture: imgdata.Location,
              user: userEmail
            });

            song.save(function(err, songInfo){
              ++count;
              if(count === files.userfile.length){
                return res.end(JSON.stringify({message: 'success upload!'}));
              }
            });
          });
          
        });
        console.log('Successfully uploaded data to ' + bucketName + "/" + keyName);
        
      });
    });
  });
  
  // return res.end(JSON.stringify({message: 'success upload!'}));
};

var searchFile = function(req, res){

  var keyword = req.query.keyword.split('.')[0];
  var condition = req.query.condition;
  var query = {};

  if(condition === 'title'){
    query['title'] = { $regex : keyword, $options: 'ix' }
  } else if(condition === 'album') {
    query['album'] = { $regex : keyword, $options: 'ix' }
  } else if(condition === 'artist') {
    query['artist'] = { $regex : keyword, $options: 'ix' }
  }

  Song.find(query)
    .then(function(data){
      res.status(200).send(data);
    })
    .catch(function(err){
      res.status(400).send(err);
    });
};

var discoverFile = function (req, res) {
  Song.find({}, function(err, data){
    if(err) throw err;
    res.status(200).send(data);
  });
};

var chartFile = function(req, res){console.log('chartFile')
  Song.find({}, function(err, data){
    res.status(200).send(data);
  });
};

var getUploadedFileList = function(req, res){
  var authorizationHeader = req.headers['authorization'];
  var token = authorizationHeader.split(' ')[1];
  var userEmail = null;
  jwt.verify(token, tokenConfig, function(err, decodedToken){
      if(err){
        return res.sendStatus(403);
      }
      userEmail = decodedToken.email;
      
      Song.find({ user: userEmail }, function(err, data){
        if(err) throw err;
        res.status(200).send(data);
      });
  });
};

var addCount = function(req, res){console.log('add count', req.query)
  var query = { "title": req.query.title };
  Song.findOneAndUpdate(query, { $inc: { "click": 1 }}, function(err, data){
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

  // var files = req.files;
  // var songList = [];
  // let count = 0;
  // let dataCount = 0;

  // for(let i = 0; i < files.length; i++){
  //   var writestream = gfs.createWriteStream({
  //       filename: files[i].originalname
  //     })

  //   writestream.on('close', function(file){

  //     var parser = mm(gfs.createReadStream({filename: file.filename}), function(err, metadata){
  //       if(err) console.log('mm', err)

  //         let formData = {};
  //         formData.title = metadata.title;
  //         formData.artist = metadata.artist[0];
  //         formData.album = metadata.album;
  //         formData.year = metadata.year;
  //         formData.picture = {};
  //         formData.picture.data = metadata.picture[0].data
  //         formData.picture.contentType = 'image/jpg';
  //         formData.filename = songList[dataCount]
  //         console.log('meta;;;;;;;;;;;', metadata);

  //         createSong(formData)
  //           .then(function(result){
  //             if(dataCount === count){
  //               console.log('db insert success!!!!')
  //               res.send('completed!')
  //             }
               
  //             dataCount++;  

  //             if(dataCount === count){
  //               console.log('db insert success!!!!')
  //               res.send('completed!')
  //             } 
              
  //           })
  //           .fail(function(error){
  //             res.json(error);
  //           })

  //     })

  //   })


  //   fs.createReadStream("./uploads/" + files[i].filename)
  //       .on("err", function(){res.send("Error uploading Music")})
  //       .pipe(writestream)


  //   gfs.remove({filename: files[i].filename}, function(err){
  //       if(err) return res.send("Error occured");
  //       console.log("Music deleted!");
  //   });

  //   songList.push(files[i].originalname)
  //   console.log(songList)

  //   count++;
  // }