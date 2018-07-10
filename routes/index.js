var fs = require('fs');
var APIKEY = "JKB8NTSI84PG6GCM41UWTK47EI8GHDA7VC";

module.exports = function (app)
{

    app.get('/getEtherBalance', function(req, res){
        console.log(req);
    });

    app.get('/login', function(req, res){
        fs.readFile('./public/login.html', function (error, data) {
            if (error) {
                console.log(error);
            } else {
                res.writeHead(200, { 'Content-Type' : 'text/html'});
                res.end(data);
            }
        })
    });

    app.get('/mypage', function(req, res){
        fs.readFile('./public/mypage.html', function (error, data) {
            if (error) {
                console.log(error);
            } else {
                res.writeHead(200, { 'Content-Type' : 'text/html'});
                res.end(data);
            }
        })
    });

    // Token Wallet Example
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

    // Token 721 Wallet Example
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

    //Login API
    app.get('/api/login', function(req, res){
        res.end();
    });

};