var utils    = require( 'util' );
var mongoose = require( 'mongoose' );
var books    = mongoose.model( 'books' );
var fs = require("fs");
var cheerio = require("cheerio");
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


// exports.index = function ( req, res, next ){
//   var user_id = req.cookies ?
//     req.cookies.user_id : undefined;
//     books.
//     find({ user_id : user_id }).
//     exec( function ( err, books ){
//       if( err ) return next( err );
//       res.render( 'index', {
//           title : 'BOOKS',
//           books : books,
//           todos : [],
//           cycles:[],
//           electronics:[]
//       });
//     });
// };



exports.create_books = function ( req, res, next ){
  console.log(req.body);
  new books({
      // user_id    : req.cookies.user_id,
      Name:req.body.name,
      Title    : req.body.abtitle,
      Posted : Date.now(),
      min_cost:0,
      Academic: false

  }).save( function (err){
    if( err ) return next( err );

    // res.redirect( '/books' );
  });
};


exports.create_items = function ( req, res, next ){
  var ip=req.body;
  var data={};
  console.log(ip);
  for(var attributename in ip){
    if(ip[attributename].length>0){
        data[attributename]=ip[attributename];
    }

    
}

data["Posted"]=Date.now();
  console.log(data);
  
  console.log(req.body);
  MongoClient.connect('mongodb://localhost:27017/sellbuy', function(err, db) {
    if(err) throw err;

  var collection = db.collection('books');

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
};





exports.createprofile=function(req,res){
  books.find({Name:req.body.name},function (err, booklist) {
  if (err) return console.error(err);
  console.log(booklist);
  results=booklist;
});
  
  list=['Name','Posted','Title'];
  fs.readFile('/home/charu/nodeprog/sellBuy/profile.html', function (err, data) {
    if (err) throw err;
    

    $ = cheerio.load(data);
    var content = "<table>"
    i=0;
    for(i=0;i<results.length;i++){
      value=results[i];
      content+='<tr>';
      for(ip in value){
            if(list.indexOf(ip)>-1){
              // console.log(ip,value[ip]);
              content += '<td>' + ip +" : "+  value[ip] + '</td>';}
        
       
      }
      content+='<td><input type="button" name="end auction" value="end"/></td></tr>'; //add redirection using location.replace
    }

     content += "</table>"

        $('#profile').append(content);


        filename='/home/charu/nodeprog/sellBuy/'+req.body.name+'.html';
        res.send($.html());

    

    
  });
      

};


exports.createprofilev1=function(req,res){
  // mongoose.connect( 'mongodb://localhost/mydb' );
  customer.find({Name:req.body.name},function (err, customerlist) {
  if (err) return console.error(err);
  console.log(customerlist);
  results=customerlist;
});
  
  // list=['Name','Posted','Title'];
  // fs.readFile('/home/charu/nodeprog/sellBuy/profile.html', function (err, data) {
  //   if (err) throw err;
    

  //   $ = cheerio.load(data);
  //   var content = "<table>"
  //   i=0;
  //   for(i=0;i<results.length;i++){
  //     value=results[i];
  //     content+='<tr>';
  //     for(ip in value){
  //           if(list.indexOf(ip)>-1){
  //             // console.log(ip,value[ip]);
  //             content += '<td>' + ip +" : "+  value[ip] + '</td>';}
        
       
  //     }
  //     content+='<td><input type="button" name="end auction" value="end"/></td></tr>'; //add redirection using location.replace
  //   }

  //    content += "</table>"

  //       $('#profile').append(content);


  //       filename='/home/charu/nodeprog/sellBuy/'+req.body.name+'.html';
  //       res.send($.html());

    

    
  // });
      

};



exports.destroy = function ( req, res, next ){
  books.findById( req.params.id, function ( err, todo ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( todo.user_id !== req.cookies.user_id ){
      return utils.forbidden( res );
    }

    todo.remove( function ( err, todo ){
      if( err ) return next( err );

      res.redirect( '/books' );
    });
  });

  Todo.findById( req.params.id, function ( err, todo ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( todo.user_id !== req.cookies.user_id ){
      return utils.forbidden( res );
    }

    todo.remove( function ( err, todo ){
      if( err ) return next( err );

      res.redirect( '/todo' );
    });
  });


};

exports.edit = function( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

//FIX THIS PROPERLY

if(req.params.ctg=='books')
{ //console.log(req.params.ctg);
  books.
    find({ _id : req.params.id }).
    //sort( '-updated_at' ).
    exec( function ( err, items ){
      if( err ) return next( err );

      res.render( 'edit', {
        title   : 'Buyer!',
        ctg	: 'books',
        items  : items,
        current : req.params.id
      });
    });}
    
if(req.params.ctg=='cycles')
{
  cycles.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'edit', {
        title   : 'Buyer!',
        todos   : todos,
        current : req.params.id
      });
    });}
if(req.params.ctg=='elex')
{
  electronics.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'edit', {
        title   : 'Buyer!',
        todos   : todos,
        current : req.params.id
      });
    });}
    
    if(req.params.ctg=='others')
{
  books.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'edit', {
        title   : 'Buyer!',
        todos   : todos,
        current : req.params.id
      });
    });}

};

exports.update = function( req, res, next ){
  if(req.params.ctg == 'books')
  {books.findById( req.params.id, function ( err, todo ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( todo.user_id !== user_id ){
      return utils.forbidden( res );
    }
// AFTER MODIFYING EDIT.EJS WITH INPUT FIELDS, MAKE CHANGES HERE
//todo.Desc = 'BID!!!!!!!!!!!!';
  todo.min_cost=req.body.name;
  //todo.name    = req.body.name;
   // todo.updated_at = Date.now();
    todo.save( function ( err, todo, count ){
      if( err ) return next( err );

      res.redirect( '/books' );
    });
  });
  }


};

// ** express turns the cookie key to lowercase **
exports.current_user = function ( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

  if( !user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }

  next();
};