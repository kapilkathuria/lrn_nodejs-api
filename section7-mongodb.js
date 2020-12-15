// Introduction to Mongodb
// NoSQL DB.  Sql are traditional.
// collections are like table.
// collectins can contain a document - docoument is like row in table

// key features
// document based database- field:value pair
// scalability: data can be distributed
// flexible: no need to define schema. each document can have different fields
// performance: embedded data models, indexing, sharding make it performant
// free and open source

// BSON
// mongodb uses BSON which is JSON with type defined for data



// this section also includes some contents from other udemy course
// https://www.udemy.com/course/mongoosejs-essentials/learn/lecture/4649696#overview
// didn't find this course much useful. all below contents can be discarded

// mongoosejs: nodejs package to work with mongodb
var mongoose = require('mongoose');
var schema = mongoose.schema;

var bookSchema = new schema({
    title: String,
    published: Boolean,
    keywords: Array,
    author:{
        type: mongoose.Schema.ObjectId,
        ref:  'User'
    }
})

module.exports = mongoose.model('book', bookSchema);

// designing mongoose schema
// https://mongoosejs.com/docs/guide.html
// let's create book.model.js
// 