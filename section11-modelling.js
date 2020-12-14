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