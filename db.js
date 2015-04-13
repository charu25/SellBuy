var mongoose = require( 'mongoose' );

var Schema   = mongoose.Schema;

var customer = new Schema({
    Name    : String,
    Pwd    : String,
    updated_at : Date,
    items:Array,
    status:Array
});

var books = new Schema({
    unq_id    : String,
    Name:String,
    min_cost    : Number,
    Dept:String,
    Sem:Number,
    Title:String,
    Author:String,
    Desc : String,
    Posted: Date,
    Academic: Boolean,
    Genre:String
});


var cycles = new Schema({
    user_id    : String,
    name: String,
    min_cost    : Number,
    Desc : String,
    Posted: Date,
    Brand: String,
    Type:String,
    Color:String
});

var electronics = new Schema({
    user_id    : String,
    name: String,
    min_cost    : Number,
    Desc : String,
    Posted: Date,
    Brand: String,
    Item:String
});


// mongoose.model( 'Profile', profile );
mongoose.model( 'books', books );
mongoose.model( 'cycles', cycles );
mongoose.model( 'customer', customer );


mongoose.connect( 'mongodb://localhost/sellbuy' );