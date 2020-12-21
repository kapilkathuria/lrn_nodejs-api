// server side rendering with Pug
// Done 173-180 on 21-Dec-20

const { title } = require("process");

// pug: is the template engine. there are other template engines
//  you don't need to require pug as well
// setting up pug in express
app.set('view engine', 'pug');
// define the path for views - this is views of MVC
app.set('views', path.join(__dirname, 'views'));
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
// serve the base view  (assuming base.pug is created in views folder)
app.get('/', (req, res) => {
    res.status(200).render('base')
})

// html in pug
// pug is white space sensitive syntax for writing html
// you can use regular html as well with pug
// in below , stylesheet and fav icon requests are separate html requests 
//  just like in react, every route is separate html request, here 
doctype html
html
  head
    title Natours
    link(rel='stylesheet' href='/css/style.css')
    link(rel='shortcut icon' type='image/png' href='/img/favicon.png')

  body
    h1 The Park Camper
    p this is some paragraph text

// using variables in pug
// send variable while rendering
app.get('/', (req, res) => {
    res.status(200).render('base', {
        tour: 'The Forest Hiker',
        name: 'Kapil'
    })
})

// now use these in pug template
// or use string function on these
    title Natours | #{tours}
h1= tour
p= name.toUpperCase()

// commenting in pug
//- the quote in pug

// buffer code - variable x is created and then it can be used in pug html
- cost x = 9;
h2 = 2 * x

// Include files
include _header

// extends our template with block
// with this you can use same base template across project
// in base.pug
    // CONTENT
    block content
      h1 This is a placeholder heading

// in overview.pug - we are extending base.bug, that is we are using complete contents of base plus
// and in base.pug, we are extending content block
      extends base

      block content