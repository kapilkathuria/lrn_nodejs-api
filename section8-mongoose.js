// using mongodb with mongoose

// what is mongoose?
// is an Object data modelling. provide higher level abstraction.
// features: schema, easy data validation,  simple query language
// mongoose schema: where we model our data, be describing the structure of the data, 
//      default values and validations
// mongoose model: a wrapper for the schema, providing an interface to the database for crud operations

// Connecting the mongodb using mongoose
const mongoose = require('mongoose');
const { stringify } = require('json5');

// in .env file - DB_URL="mongodb://localhost/attested-dev"

module.exports = async () => {
    try {
      await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      logger.info('database connnected, ', { source: 'database.connections' });
    } catch (error) {
      logger.error(error.message, { source: 'database.connections', ...error });
      throw new Error(error);
    }
  };

// let's create simple mongoose schema
// model is like classes in java. these are the blueprint for our documents in mongodb
// for crud operatioons we need a mongoose model
// for creating model, we need mongoose schema
// we use schema to describe, validate data

// let's create schema for tours

const toursSchema  = new mongoose.Schema({
    // multiple ways of specifing field name, type , if it is required, default value
    name: {
        type: String,
        default: "some default name", // default value
        unique: true,       //  if this should be unique
        required: true
    },
    rating: Number,
    price: {
        type: Number,
        required: [true, "A tour must have a price"]    // what message to show if field is not provided
    },
})

// let's create model
// it's convention to use first letter as uppercase for model names
// The first argument is the singular name of the collection your model is for. 
// Mongoose automatically looks for the plural, lowercased version of your model name. 
// Thus, for the example above, the model Tour is for the tours collection in the database.
const Tour = mongoose.model('Tour',  toursSchema)

// let's save some data
const testTour= new Tour({
  name: 'The Forest tour',
  rating: 4.7,
  price: 450,
});

// saving return document itself which is saved
testTour.save().then(doc => {
  console.log(doc);
}).catch(err => {
  console.log('Error: ', err);
})

// MVC architecture
// model: business logic and application data
// controller: interact  with route, model and view
// view: ui of frontend

// business logic vs appliation logic
// difference is bit opionated
// application: not related to business problem, it's more about technical problem
// business logic: related to business problem

// general: FAT models and thin controllers. keep controller as lean as possible

// othe way of saving 
// Tour.create(req.body) is same as const testTour= new Tour({ }) and testTour.save()

// mongoose find 
// find - find all
// findById - searches only for _id field
// findOne - find only one document

// filtering, sorting, limiting, pagination 
// 127.0.0.1:3000/api?sort=-price,ratings&difficulty=medium
// in above url - we are saying sort result  by price (descendig - see - just before price) first
//    and then by ratings
//    and find all documents where difficulty=medium
// see 4-natours/after-section-08/utils/apiFeatures.js for details

// excluding a field - notice minus sign: query.select('-__v');

// pagination -skip x records and limit records to limit: 
// query.skip(skip).limit(limit)

// aggregation with mongoose
// this is mongodb feature exposed by mongoose as well
// this aggregates data over multiple document  i.e. averagae, sum etc.
// See 4-natours/after-section-08/controllers/tourController.js for details
// below we are agregating various data and then grouping based on difficulty level
// $group: {
//   _id: { $toUpper: '$difficulty' },
//   numTours: { $sum: 1 },
//   numRatings: { $sum: '$ratingsQuantity' },
//   avgRating: { $avg: '$ratingsAverage' },
//   avgPrice: { $avg: '$price' },
//   minPrice: { $min: '$price' },
//   maxPrice: { $max: '$price' }
// }

// aggregation pipeline: projecting and unwinding
// this can be used in real business problelm
// let's say - we need to project which will be busy month for us
// i.e. how many tours we have in each month
// 
// unwind: deconstruct an array field from each document and output one array altogether
// project: we give each field 0 or 1 - field with 0 is not passed to next stage while with 1 are passed
// See getMonthlyPlan function in 4-natours/after-section-08/controllers/tourController.js
//    for many options in pipeline

// virtual propeties
// are the fields which won't presist to save space
// used for fields which can be drived from other fields
// note: a regular function is used below rather than arrow functin because 'this' keyword is only available in
//    in regular function
// 
// tourSchema.virtual('durationWeeks').get(function() {
//   return this.duration / 7;
// });

// for virtual propeties to be part of our model so that virtual propeties is shown when we output
//  add following to model option

//   {
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true }
// }

// note for virtual properties
// 1. these can't be used in query

// document middleware
// just like express, moongoose has concept of middleware
// mongoose middleware is called pre and post function
// as we can define function to run

// there are 4 type of middleware for mongoose
// 1. document middleware: document which can act currently processed documents
// 2. query middleware
// 3. aggregate
// 4. model

// 1. document middleware: 
// tourSchema.pre -- pre middleware - before document is saved
// tourSchema.post - post middleware - after document is saved. 'this' keyword is not available, while 'doc' is available
// tourSchema.pre('save' - multiple pre middleware for same hook. 'save' is called hook in this case i.e. middleware to be
//    used before save.
// you can have multiple pre and post document middleware

// 2. query middleware
// allow to run function before or after query
// you can also use regular expression in hook's name
// in below, pre will work for find, findOne etc.
// tourSchema.pre(/^find/, function(next) {


// validator
// note: unique is not validator
// NOTE: this only points to current doc on NEW document creation but not for update
// middleware is also available for validation
// most popular: validator - https://github.com/validatorjs/validator.js?files=1