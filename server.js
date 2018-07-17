var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

require('./routes')(app);

app.listen(8080, function() {
    console.log('Server Start');
});