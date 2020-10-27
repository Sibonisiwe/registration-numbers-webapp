const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const Registrations = require('./reg-fac');
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/registration_numbers';
const pool = new Pool({
  connectionString
});

registrations = Registrations(pool)
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

app.get('/', async function (req, res) {

  res.render('index', {
  })
});


app.post('/', async function (req, res) {
  var regEntered = req.body.reg;


if (!regEntered) {
    req.flash('info', 'Please enter a registration number');
} else {
  var regList = {
    addReg: await registrations.addRegistrations(regEntered),
    getReg: await registrations.getRegistrations(),
  }
}
  res.render('index', {
    regList
  })
});


app.post('/reg-num', async function (req, res){
  var towns = req.body.town;
  if (!towns) {
    req.flash('info', 'Please select a town');

} else {
  var filteredTown = {
    filter: await registrations.filters(towns)
  }
}
  res.render('index', {
    filteredTown
  })
}); 






const PORT = process.env.PORT || 3003;

app.listen(PORT, function () {
  console.log('App starting on port:', PORT);
})