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

// using mongo shell
// create or switch to a db: use natures
// collection: below insert command will also create collection
// insert one record: db.tours.insertOne({name:"The Forest", prize:300, rating:4.0})
// insert many:  db.tours.insertMany([{name:"The Sea expo", prize:499, rating:4.3}, {name:"The Snow adv", prize:599, rating:4.9, difficulty:"easy"}])
// show all the objects in collections: db.tours.find()

// using mongo shell - querying documents
// with filter i.e name:
// > db.tours.find({name:"The Forest"})
// special query operations
// $lt  - less than, $lte - less  than or equal, $gt: greater than
// special query operator $ - price less than 500. $lte - less than or equal
// db.tours.find({prize: {$lte: 500} })
// AND : or in below prices < 500 and rating > 4
// > db.tours.find({prize: {$lte: 500}, rating: {$gte:4} })
// OR: eithe is true
// db.tours.find({$or: [{prize: {$lte: 500}}, {rating: {$gte:4}}] })
// same query as bove but returns only name field
// db.tours.find({$or: [{prize: {$lte: 500}}, {rating: {$gte:4}}] }, {name:1} )


// using mongo shell - updating documents
// first query is object i want to searh, and second is to set
// db.tours.updateOne({name:"The Forest"}, {$set: {price: 321}})
// update many where condition is met and create new field
// db.tours.updateMany({price:{$gt:500}, rating: {$gte: 4} }, {$set: {premium:true} })
// to replace content many
// db.tours.replaceone or replacemany
// to delete
// db.tours.deleteone or deletemany
// db.tours.deletemany({prize: {$lte: 500}, rating: {$gte:4} })
// delete all data
// db.tours.deletemany()

// connecting to mongodb on atlas from mongoshell
// run below command on command prompt
// mongo "mongodb+srv://cluster0.e9xat.mongodb.net/<dbname>" --username kapil




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