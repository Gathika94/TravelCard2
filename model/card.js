/**
 * Created by gathika on 11/24/17.
 */
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var CardsSchema = new Schema({
    identification: String,
    balance: Number,
});

//export our module to use in server.js
module.exports = mongoose.model('Card', CardsSchema);
