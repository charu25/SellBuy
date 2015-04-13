express=require("express");
var app=express();
var http = require("http");
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

var fs = require("fs");
var cheerio = require("cheerio");
var assert = require("assert");


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

app.post('/profile', function(req, res){

    MongoClient.connect('mongodb://localhost:27017/mydb', function(err, db) {
    if(err) throw err;

  var collection = db.collection('sellbuy');

  collection.find({name:req.body.name}).toArray(function(err, results) {
        res.send(results);

  fs.readFile('/home/charu/nodeprog/sellBuy/profile.html', function (err, data) {
    if (err) throw err;
    $ = cheerio.load(data);
    
  });
        db.close();
      });


  })
  
  
  });







app.post('/test',function(req, res){
  var ip=req.body;
  var data={};
  console.log(ip);
  for(var attributename in ip){
    if(ip[attributename].length>0){
        data[attributename]=ip[attributename];
    }

    
}
  console.log(data);

  MongoClient.connect('mongodb://localhost:27017/mydb', function(err, db) {
    if(err) throw err;

  var collection = db.collection('sellbuy');

  collection.insert(data, function(err, docs) {

      collection.count(function(err, count) {
        console.log(format("count = %s", count));
      });

      collection.find().toArray(function(err, results) {
        console.dir(results);
        db.close();
      });
    });
    
  })
  
  
	
});



app.listen(3000);