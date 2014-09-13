express=require("express");
var app=express();
var http = require("http");
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
require( './db' );
var fs = require("fs");
var cheerio = require("cheerio");
var assert = require("assert");
var routes  = require( './routes' );
var path    = require( 'path' );




app.configure(function() {
    app.use(express.static(__dirname));
});

app.use(express.urlencoded());
app.use(express.json()); 
//app.use(express.multipart());


app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.get('/bids', function(req, res){
  res.sendfile(__dirname + '/bids.html');
  });





app.post( '/create_items',      routes.create_items );
app.post('/profile',routes.createprofile);


// app.get(  '/destroy/:id', routes.destroy );
// app.get(  '/edit/:id/:ctg',    routes.edit );
// app.post( '/update/:id/:ctg',  routes.update );
// //app.get('/books',exp.foo);



app.listen(3000);