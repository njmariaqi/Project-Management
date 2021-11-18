const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers/index');
const sequelize = require('./config/connection');
//const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 900000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({});


app.engine('handlebars', exphbs({
  helpers:{
    math: function(lvalue, operator, rvalue) {lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    },
    option1: function(e) {
      let arry = ["Not Started", "On Track", "Issue", "Finished"]
      return arry.filter(x => x !== e)[0]
    },
    option2: function(e) {
      let arry = ["Not Started", "On Track", "Issue", "Finished"]
      return arry.filter(x => x !== e)[1]
    },
    option3: function(e) {
      let arry = ["Not Started", "On Track", "Issue", "Finished"]
      return arry.filter(x => x !== e)[2]
    }
}}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
