require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const massive = require("massive");
const path = require("path");

const port = 3001;

const app = express();

const { 
  CONNECTION_STRING, 
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_SECRET 
} = process.env;

massive(CONNECTION_STRING)
  .then(db => {
      app.set("db", db);
  })
  .catch(console.log());


app.use(json());
app.use(cors());

app.use(
  session({
    secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
          maxAge: 100000
          }
  })
)

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy({
      domain: DOMAIN,
      clientSecret: CLIENT_SECRET,
      clientID: CLIENT_ID,
      scope: "openid profile",
      callbackURL: "/auth"
  }, (accessToken, refreshToken, extraParams, profile, done) => {
      app
      .get("db")
      .getUserByAuthId(profile.id)
      .then(response => {
          if (!response[0]) {
            app
            .get('db')
            .createUserByAuthId([profile.id, profile.displayName])
            .then(created => done(null, created[0]));
        } else {
          return done(null, response[0])
        }
      });
    }
  )                                      
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// ***** ENDPOINTS ******

// AUTHORIZATION
app.get(
  '/auth', 
  passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/',
  failureRedirect: 'http://localhost:3000/#/auth'
  })
);

// USER ENDPOINT
app.get('/api/me', (req, res) =>{
  // console.log(req.user);
  if(req.user) {
  res.status(200).json(req.user)
} else {
    res.redirect('http://localhost:3000/#/login');
  }
});

// PRODUCTS ENDPOINT
app.get('/api/getproducts', (req, res) => {
  let db = app.get('db')
  db.getProducts().then(response => {
    console.log("get endpoint", response)
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(404).json(err)
  });
});



// POST_TO_CART
app.post('/api/postcart', (req, res) =>{
  // let db = app.post('db')
  const id = req.user.id;
  const description = req.body.description;
  const price = req.body.price;
  req.app.get("db").postToCart(id, description, price).then(cart => {
    console.log("server post dude", req.user.cart);
    res.status(200).json(cart);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

// LOGOUT ENDPOINT / SESSION END
app.get('/api/logout', (req, res) => {
  req.session.destroy( () => {
    res.redirect('http://localhost:3000/#/login');
  });
});

app.listen(port, () =>{
  console.log(`jammin' on teh Port: ${port} mon`);
});
