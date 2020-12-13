// building api using Express

const { Server } = require("http");

// each route is like a mini app
// you can run middleware when specific parameter is provided for given route as follows
router.param('id', tourController.checkID);
// for details, see -  4-natours/after-section-06/routes/tourRoutes.js

// for serving static file
app.use(express.static(`${__dirname}/public`));
// when we open any file, it tries to see if it is meant for any route
// if not, then will try to serve that from static folder defined above

// enviornment variables
// this is not related to node but in general related to nodejs
// we might have different variables based on the enviornment such as prod or development
// by default exprss sets enviornment to development
// 
// use below to log current enviornment of express
console.log(app.get('env'));
// OR
console.log(process.env);

// setting enviornment variable with command line as follows
// NODE_ENV=development X=23 nodemon server.js

// 
// 
// using config file
// create config.env in main dir of app - 4-natours/after-section-06/config.env
// you can read this config file as follows
// dotenv.config({ path: './config.env' });
// 
// config package.json for starting app in dev and prod
// "start:dev": "nodemon server.js",
// "start:prod": "NODE_ENV=production nodemon server.js"

// 
// 
// setting up eslint and prettier
// again this is not specific to express but general topic for nodejs
// eslint: code quality. scan code to find code error and bad coding practices
//          eslint can also be used for code formatting
// prettier: formats the code to look more readable and consistent
// install eslint and prettier vs code extenstions
// intall eslint and prettier with npm as well. all these need to be installed locally
//  npm i  eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y
//      prettier eslint-plugin-react eslint-plugin-prettier eslint-plugin-node --save-dev
// note: eslint-plugin-react is still required even if you are not writing code for react. this is dependency 
//      for airbnb style
// once all packages are installed, we need config file for eslint and prettier
// useful documentation
// https://eslint.org/docs/rules/
