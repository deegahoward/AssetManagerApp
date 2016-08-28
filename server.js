var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var router = express.Router();
var app = express();
var pg = require('pg');


var http = require('http').Server(app);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app, express);


// setting up the default pages for main and mobile app


app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/public/app/views/index.html');
});


http.listen(config.port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port 3000");
    }
});

