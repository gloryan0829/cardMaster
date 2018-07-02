var express = require('express');
var app = express();
var fs = require('fs');

// app.use('/examples/lib', express.static('public'));

app.listen(8080, function() {
    console.log('Server Start');
})

app.get('/TokenWallet', function(req, res){
    fs.readFile('./public/TokenWallet.html', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            res.writeHead(200, { 'Content-Type' : 'text/html'});
            res.end(data);
        }
    })
});

app.get('/Token721Wallet', function(req, res){
    fs.readFile('./public/721TokenWallet.html', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            res.writeHead(200, { 'Content-Type' : 'text/html'});
            res.end(data);
        }
    })
});