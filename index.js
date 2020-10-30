const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const Registrations = require('./reg-fac');
const Reg = require('./reg')
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/registration_numbers';
const pool = new Pool({
  connectionString
});

const registrations = Registrations(pool);
const reg = Reg(registrations);

const app = express();


app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts'
}));

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', reg.homeRoute)  
 


app.post('/', reg.addRegList) 
  



app.post('/reg-num', reg.filteredList)
  

app.get('/clear', reg.clearList) 




const PORT = process.env.PORT || 3003;

app.listen(PORT, function () {
  console.log('App starting on port:', PORT);
})