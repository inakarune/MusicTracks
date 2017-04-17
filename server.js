const express = require('express');
const methodOverride = require('method-override');

// const multer = require('multer');
// const upload = multer({ dest: './uploads/' })


const session = require('express-session');



// const Buffer = require('buffer').Buffer;
// const Iconv = require('iconv').Iconv;

// const iamporter = new Iamporter({
// 	apiKey: config.apiKey,
// 	secret: config.secret
// });

const app = express();
const port = 8080;

// mongoose.connect('mongodb://localhost/Musictracks');
app.use('/', express.static(__dirname + '/dist'));
// app.set('views', path.join(__dirname, 'dist'));
// app.set('view engine', 'html')

require('./database').connect(process.env.MONGODB_URL);

require('./middlewares')(app);

require('./config/routes')(app);



// const conn = mongoose.connection;

// Grid.mongo = mongoose.mongo;

// var gfs;

// conn.once('open', function(){
// 	gfs = Grid(conn.db);
// 	app.get('/', function(req, res){
// 		res.render('home')
// 	})
// });



app.use(session({
	secret : '123552dehisdfkcn',
	resave : false,
	saveUninitialized : true
}));





// require('./server/routes/router')(app);


// var song = mongoose.model('song', songSchema);

// var findSong  = Q.nbind( song.find, song );
// var createSong = Q.nbind( song.create, song );
// var removeSong = Q.nbind( song.remove, song );




// app.get('/search/:keyword/:condition', function(req, res){

// 	console.log('queryString', req.query);
// 	let keyword = req.query.keyword.split('.')[0];
// 	let condition = req.query.condition;
// 	let query = {}

// 	if(condition === 'title'){
// 		query['title'] = { $regex : keyword, $options: 'ix' }
// 	} else if(condition === 'album') {
// 		query['album'] = { $regex : keyword, $options: 'ix' }
// 	} else if(condition === 'artist') {
// 		query['artist'] = { $regex : keyword, $options: 'ix' }
// 	}

// 	findSong(query)
//   				.then(function(data){
//   					console.log('findSong', data)

//   					res.send(data)
//   				})
//   				.fail(function(err){
//   					res.send(err)
//   				})

	// var readstream = gfs.createReadStream({"filename" : "butterfly.mp3"});
	// console.log('search url', readstream)
	//   gfs.findOne({ "filename" : "butterfly.mp3" }, function(err, file){
	//   	if(err){
	//   		console.log(err)
	//   	} else {
	//   		console.log('gfsfile!!!!', file)
	//   		res.set('Content-type', file.contentType);
	//  			res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
	//   		// res.download(file)
	//   	}
	//   })

	//    readstream.pipe(res);
	
// })



// app.get('/download/:filename', function(req, res){
// 	var path = req.params.filename;
// 	console.log('/download/:length!!!')
// 	console.log(req.params)


// 	var readstream = gfs.createReadStream({ filename : path });
// 	  gfs.findOne({ filename : path }, function(err, file){
// 	  	if(err){
// 	  		console.log(err)
// 	  	} else if(!file){
// 	  		console.log('i am null')
// 	 			res.json()
// 	  	} else {
// 	  		console.log('i am not null', file)
	  		
	  	// 	const iconv = new Iconv('utf-8', 'utf-8//translit//ignore');
				// const searchResult = new Buffer(file.filename);
				// var searchResultUtf8 = iconv.convert(searchResult).toString('utf-8');

				
				// var encoded = encodeURIComponent(file.filename);

				// res.writeHead(200, {
				// 	'Content-Type': file.contentType,
				// 	'Content-Disposition' : 'attachment; filename=' + file.filename
				// })
// 	  		res.set('Content-type', file.contentType);
// 	 			res.setHeader('Content-Disposition', 'attachment; filename="' + file.filename + '"');
// 	  	}
	  	
// 	  })

	  
//     readstream.on("error", function(err){
//       res.send("No Music found with that title");
//     });

//     readstream.pipe(res);

// })

// app.post('/upload', upload.array('userfile', 20), function(req, res, next){
	
// 	var files = req.files;
// 	var songList = [];

	// console.log('리퀘스트 파일', files)
	// for(let file of files){
	// 	formInfo.songList.push(file.originalname);
	// }


	// findSong({ "title": req.query.keyword})
	//   				.then(function(data){
	//   					console.log(data)
	//   					if(!data.length){
	//   						createSong(formInfo)
	// 												.then(function(result){
	// 													console.log('db insert success!!!!')
	// 												})
	// 												.fail(function(error){
	// 													res.json(error)
	// 												})
	//   					} else {
	//   						res.send('이미 등록되어 있습니다.')	
	//   					}
	//   				})
	//   				.fail(function(err){
	//   					console.log(err)	
	//   				})

	// let count = 0;
	// let dataCount = 0;

	// for(let i = 0; i < files.length; i++){
	// 	var writestream = gfs.createWriteStream({
 //      	filename: files[i].originalname
 //    	})

	// 	writestream.on('close', function(file){

	// 		var parser = mm(gfs.createReadStream({filename: file.filename}), function(err, metadata){
	// 			if(err) console.log('mm', err)

	// 				let formData = {};
	// 				formData.title = metadata.title;
	// 				formData.artist = metadata.artist[0];
	// 				formData.album = metadata.album;
	// 				formData.year = metadata.year;
	// 				formData.picture = {};
	// 				formData.picture.data = metadata.picture[0].data
	// 				formData.picture.contentType = 'image/jpg';
	// 				formData.filename = songList[dataCount]
	// 				console.log('meta;;;;;;;;;;;', metadata);

	// 				createSong(formData)
	// 					.then(function(result){
	// 						if(dataCount === count){
	// 							console.log('db insert success!!!!')
	// 							res.send('completed!')
	// 						}
							 
	// 						dataCount++;	

	// 						if(dataCount === count){
	// 							console.log('db insert success!!!!')
	// 							res.send('completed!')
	// 						} 
							
	// 					})
	// 					.fail(function(error){
	// 						res.json(error);
	// 					})

	// 		})

	// 	})


	// 	fs.createReadStream("./uploads/" + files[i].filename)
 //    		.on("err", function(){res.send("Error uploading Music")})
 //        .pipe(writestream)


 //  	gfs.remove({filename: files[i].filename}, function(err){
 //        if(err) return res.send("Error occured");
 //        console.log("Music deleted!");
 //  	});

 //  	songList.push(files[i].originalname)
 //  	console.log(songList)

	// 	count++;
	// }


	// var writestream = gfs.createWriteStream({
 //      	filename: req.file.originalname
 //    	});
	// fs.createReadStream("./uploads/" + req.file.filename)
 //    		.on("err", function(){res.send("Error uploading Music")})
 //        .pipe(writestream);

 //  gfs.remove({filename: req.file.filename}, function(err){
 //        if(err) return res.send("Error occured");
 //        console.log("Music deleted!");
 //  });  	
    
// });


//delete the image
// app.get("/delete/:filename", function(req, res){
//   gfs.exist({filename: req.params.filename}, function(err, found){
//     if(err) return res.send("Error occured");
//     if(found){
//       gfs.remove({filename: req.params.filename}, function(err){
//         if(err) return res.send("Error occured");
//         res.send("Music deleted!");
//       });
//     } else{
//       res.send("No Music found with that title");
//     }
//   });
// });


app.listen(port, () => console.log('Express listening on port', port))

module.exports = app;
