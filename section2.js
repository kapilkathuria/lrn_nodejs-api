// section 2: intro  to node
// covers building a small fun project

// this is top  down approach
// first a project is being created and basics will be covered later
// 
// def: node.js - is a javascript runtime based on chromium v8. this is running javascript outside
//  browser. javascript is executed in v8 engine.

// why node and what type of apps you should build
// it's fast because: single threaded, based on event driven, non-blocking i/o model
//  perfect for building fast and scalable data intensive apps

// what shouldn't be built wiih tnode
// heavy server side processing / cpu intensive
// for these use cases ruby on rails or pythin  or php is more suitable


// REPL
// node
// press tab two times to see all variables
// _ is previous result
// > 3*8
// 24
// > _+8
// 32

// core modules
// fs - file system

// async nature
// blocking and non blocking

// routing
// if (pathname === '/' || pathname === '/overview') {
// res.writeHead(200, {
//     'Content-type': 'text/html'
//   });

// html templating
// a template is created in html where actual data can be filled later
// see 1-node-farm/final/templates/template-product.html and other html files in this folder

// packgae versioning
// ^: carrot: allows install of latest Minor version release
// ~: allows install of latest Patch release
// *: allows install of latest Major version release. this is not used usually

// using prettier
// intall and change configuration in settings