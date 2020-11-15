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