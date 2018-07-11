var fs = require('fs');
var _ = require('lodash');
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

    app.get('/tradeToken', function(req, res){
        fs.readFile('./public/tradeToken.html', function (error, data) {
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

    app.get('/api/items', function(req, res){
        var rawData = fs.readFileSync('./public/data/item.json');
        var items = JSON.parse(rawData);
        res.json(items);
    });

    app.get('/api/items/:id', function(req, res){
        var rawData = fs.readFileSync('./public/data/item.json');
        var items = JSON.parse(rawData);
        var data = _.find(items.items, {tokenSeq: Number(req.params.id) });
        if(!data) data = {"tokenSeq":-1};
        res.json(data);
    });
};