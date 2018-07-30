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

    // 로그인 페이지
    app.get('/login', function(req, res){
        goHtmlPage('./public/login.html',req, res);
    });

    // 마이페이지
    app.get('/mypage', function(req, res){
        goHtmlPage('./public/mypage.html',req, res);
    });

    // 마이페이지
    app.get('/', function(req, res){
        goHtmlPage('./public/mypage.html',req, res);
    });

    // 마켓플레이스
    app.get('/marketPlace', function(req, res){
        goHtmlPage('./public/marketPlace.html',req, res);
    });

    // 토큰 구매
    app.get('/tradeToken', function(req, res){
        goHtmlPage('./public/tradeToken.html',req, res);
    });

    app.get('/battle', function(req, res) {
        goHtmlPage('./public/battle.html', req, res);
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

    // Token Wallet Example 토큰 지갑 예제 ( * 별도 )
    app.get('/TokenWallet', function(req, res){
        goHtmlPage('./public/TokenWallet.html',req, res);
    });

    // Token 721 Wallet Example ERC721 토큰 지갑 예제 ( * 별도 )
    app.get('/Token721Wallet', function(req, res){
        goHtmlPage('./public/721TokenWallet.html',req, res);
    });

};