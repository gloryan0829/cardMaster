var fs = require('fs');
var _ = require('lodash');
var APIKEY = "JKB8NTSI84PG6GCM41UWTK47EI8GHDA7VC";

function goHtmlPage(url, req, res) {
    fs.readFile(url, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            res.writeHead(200, { 'Content-Type' : 'text/html'});
            res.end(data);
        }
    })
}

module.exports = function (app)
{

    app.get('/getEtherBalance', function(req, res){
        console.log(req);
    });

    app.get('/login', function(req, res){
        goHtmlPage('./public/login.html',req, res);
    });

    app.get('/mypage', function(req, res){
        goHtmlPage('./public/mypage.html',req, res);
    });

    app.get('/', function(req, res){
        goHtmlPage('./public/mypage.html',req, res);
    });

    app.get('/marketPlace', function(req, res){
        goHtmlPage('./public/marketPlace.html',req, res);
    });

    app.get('/tradeToken', function(req, res){
        goHtmlPage('./public/tradeToken.html',req, res);
    });

    // Token Wallet Example
    app.get('/TokenWallet', function(req, res){
        goHtmlPage('./public/TokenWallet.html',req, res);
    });

    // Token 721 Wallet Example
    app.get('/Token721Wallet', function(req, res){
        goHtmlPage('./public/721TokenWallet.html',req, res);
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