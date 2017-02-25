const express = require('express');
const router = require('./server/routes/router.js');
const methodOverride = require('method-override');


const app = express();
const port = 8080;

app.use('/', express.static(__dirname + '/dist'));

const songController = require('./server/db/song/songController.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/insertsong', songController.insertSong );
app.post('/removesong', songController.removeSong );
app.get('/searchsong', songController.searchSong );
app.get('/downlaodsong', songController.downloadSong );


app.listen(port, () => console.log('Express listening on port', port))

module.exports = app;