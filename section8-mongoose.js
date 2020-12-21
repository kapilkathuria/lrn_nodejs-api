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