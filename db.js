var mongoose = require( 'mongoose' );

var Schema   = mongoose.Schema;

var Profile = new Schema({
    user_id    : String,
    Pwd    : String,
    updated_at : Date
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


mongoose.connect( 'mongodb://localhost/sellbuy' );