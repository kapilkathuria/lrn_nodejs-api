// Modelling Data and Advanced Mongoose
// 
// Mongodb database modelling
// this is key step for building performant application
// What is data  modelling: taking unstructured data and model it to structed data 
//  so that it can be managed in db
//  so that relationship can be maintained between various entities

// four thing you will understand now
// 1. identify different types of relatinship between data
// 2. referencing / normalization vs embedding/denormalization
// 3. embedding or referncing other type of documents
// 4. types of referencing

// 1. identify different types of relatinship between data
// 3 big types - 1:1, 1:many, many:many
// 1:1 - 1 field will have 1 value i.e. movie will have name
// 
// 1:many - this is most important
// this is of 3 type - 1:few, 1:many, 1:ton
// 1:few : 1 movie can win many awards. 
// 1:many: 1 movie can have thousand reviews
// 1:ton: application log can have million records
// in mongodb: 
// 
// many:many - this is less common
// i.e. one movie can have many actors, and at same time actor can play in many movies

// 2. referencing / normalization vs embedding/denormalization
// referencing: all the data is nicely segregated
// ex. movie to actor relation - movie detail is kept separate from actor. see 
// embedding: related data is kept together i.e. movie and actor data is kept together
//  in this case few queries will be needed. but con is - we can't embedded data own it's own
// 
// in relational databases - data is always normalized. only in nosql databaes, data can be denormalized
// 

// 3. when to embed and when to refernce
// 1. relationship type: how dataset are related to each other
// 2. data access pattern: how data is read and written
// 3. data closeness: how much the data is related, how we want to query
// 

// 4. types of referencing
// there are 3 types
// a) child referencing: 1:few. movie to actor can be child reference. a movie can refer to multiple actors
// b) parent referecing: 1:many or 1:ton. if there are huge no. of childs, a child can refer to parent. 
//      parent doesn't know any child.
// c) 2 way referencing: many:many. 

// general guidleines
// 1. Identify the questions that arise from your appliation's use cases first and then model your data so that 
//      questions can be ansered in most efficient way
// 2. embedding
//      in general always favor embedding unless good reasons for referencing
//      when data is mostly read but rarely updated, and dataset are close
// 3. referencing
//      1:TON and many:many are good reason for referencing
//      if data is updated a lot 
//      if you need to access dataset a lot on it's own
//      child ref: 1:few ; parent: 1:many, 1:ton ; 2way: many:many

// sample data models for natures app
// collections: tours and users - these two are completly separate
// other collections: reviews, locations, bookings
// relationship: 
//      users: reviews --> 1:many --> parent referencing (review will keep reference of user)
//      tours: review --> same as above
//      tours: location --> few:few  or many:many --> embedding or 2 way referencing but author decided to embed 
//              because there are few locations
//      tours: users --> users to tour guide . few:few . bit tricky child referencing or embedding could work
//      booking:users --> 1:many . parent referencing
//      booking: tours --> 1:many . same as above

// geospatial data in mongodb
// mongodb supports geospatial out of box


// embedding
// ex. tourguide document in tour document
// See 4-natours/after-section-11/models/tourModel.js
// tourSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// referencing
// See 4-natours/after-section-11/models/tourModel.js
// guides: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: 'User'
//     }
//   ]

// Populate
// used for reading the data. when data is referenced, with populate, it will seem like data is embedded
// Note: populate will  create another query on the backend and it will impact peformance
// for reference , see 4-natours/after-section-11/models/reviewModel.js
// reviewSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });

//   Parend referencing
// this is same as child referencing
// populate can be used here as well while querying
// tour: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'Tour',
//     required: [true, 'Review must belong to a tour.']
//   },
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User',
//     required: [true, 'Review must belong to a user']
//   }

// virtual populate
// problem with above implementation is how do we get reviews when queryingn for tour
// as parent doesn't know about children
// first solution: query review first and then tour
// 2nd solution: do child referencing in tour
// 3rd solution: virtual populate. virtual child review are kept with tour but are not persisted
// // Virtual populate example
// this is saying localField _id is related to tour field in other model
// tourSchema.virtual('reviews', {
//     ref: 'Review',
//     foreignField: 'tour',
//     localField: '_id'
//   });
// 
// if there are both parent and child reference - it will create circular reference
// to avoid this, as of now, you may need to turn off one of the populate causing circular reference

// Nested route
// if two routes have clear parent child relationship
// example - POST /tour/123456/review
// this can be done by calling reviewController in tourRoutes
// other way is using advance feature of express
// mergeParams: advance feature of express to merge
// put this in reviewRouter
// const router = express.Router({ mergeParams: true });
// and this in tourRoutes
// router.use('/:tourId/reviews', reviewRouter);
// 
// mergeParams: now reviewRouter will have access to params of tourRoutes when called from tourRoutes

// building factory function
// refernce: 4-natours/after-section-11/controllers/handlerFactory.js
// author has kep factory function in controller because these functions return controllers

// preventing duplicate reviews
// each user should reviw one tour only once
// we need tour and user combination to be unique
// it is easy to do that with indexes
// reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
// const validator = require('validator');
// validate: [validator.isAlpha, 'Tour name must only contain characters']
// 