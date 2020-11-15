// section 3 and 4:  backend and how node work
// how nodejs works - a look behind scene
// v8 (c++) code wil convert javascript to
// libuv (c++): strong focus on async i/o - implements thread pool and event loop
// http-parse, c-ares, openssl, zlib

// process
// node process in execution
// 
// thread
// nodejs is single thread. you will have to be careful in not blocking that single thread.
//   
// thread-pool
// gives 4 additonal thread (these can be configured upto 128)
// tasks offloaded to thread-pool: file system, crpto, compression, dns lookup
// 
// event loop
// all the code that is inside callback fuctions
// this is heart of nodejs architecure
// how to write peformant code? don't block
//  don't use sync version for fs, crypto, zlib
//  don't perform complex calculations (ie loop inside loop)
//  be careful with json in large objects
//  don't use complex regular expressions
//  
// other languages - i.e. php
//  every work creates it's own thread

// event and event driven architecute
//  event emitters: emits the event
//  event listners: listen for events and call callback functions
//  example: server.on is event listener
//  this is  called observer pattern in java
//  const serve = http.createserver();
//  server.on()

// Streams
// read data piece by piece
// this helps save the memory
// for ex. video playing - happens with stream. but this principles applies to any large data
// 
// there are 4 different types of streams
// readable: from which we can consume data. ie http request, fs read stream
//      these are the implementation of eventEmitter
//      important events: data, end
//      functions: pipe(), read()
// writable: to which we can write. ie http response, fs write streams
//      important events: drain, finish
//      functions: write(), end()
// duplex: can both read and write. not that common. ie net web socket
// 
// transform streams: these are duplex and at same time can transform. 
//      

// how module require works
// each js file is treated as separate module
// native ecma module system: require
// resolve and loading --> wrapping --> execution --> returing exports --> caching
// resolving
//  1. try core
//  2. if begins with ./, try to load from path
//  3. if not found, try to find index.js
//  4. try npm installed 3rd part modules
// 
// wrapping:
//  
// exporting
//  module.exports -  to export one single variable
//  exports.add - to export multiple named variables. ie (exports.add = (a,b) => a+b);
// 
// caching: if you require same module multiple time, it is used from cache