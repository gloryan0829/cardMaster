var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// var mongoose = require('mongoose');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

require('./routes')(app);


// var db = mongoose.connecti˘˘on;

// db.on('error', console.error);
// db.once('open', function() {
//    console.log("Connected to mongodb server!! :) ");
// });
//
// mongoose.connect('mongodb://cardmaster:cardmaster@127.0.0.1:27017/cardmaster',{ useMongoClient: true })
//     .then(function() { console.log('Connected!!!!!') })
//     .catch(function(e) { console.error(e) })


app.listen(8080, function() {
    console.log('Server Start');
});