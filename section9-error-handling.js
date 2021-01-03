// Error handling and debugging

// debugging

// VS Code:

// Google NDB: Google node debugger
// https://www.npmjs.com/package/ndb
// npm i ndb --save-dev or npm i ndb --global
//  above didn't work for me on ubuntu 18.04  on windos 10 WSL - windows subsystem for linux
//  as workaround tried this but didn't work- npm install -g --prefix=$HOME/.npm ndb; export PATH="$HOME/.npm/bin:$PATH"
//  another thread - if you still want to use: https://github.com/GoogleChromeLabs/ndb/issues/20
// in package.json: "debug": "ndb server.js"