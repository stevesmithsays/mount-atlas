require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const massive = require("massive");


const port = 3001;

const app = express();

app.use( express.static(`${__dirname}/../build`) );

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
          maxAge: 7000000
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
    // console.log("get endpoint", response)
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(404).json(err)
  });
});


// POST_TO_CART
app.post('/api/postcart', (req, res) =>{
  const id = req.user.id;
  const description = req.body.description;
  const price = req.body.price;
  const product_id = req.body.product_id;
  const qty = req.body.qty;
  req.app.get("db").postToCart(id, description, price, product_id, qty).then(cart => {
    console.log("server now", req.body);
    res.status(200).json(cart);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

// POST FAVORITES
app.post('/api/favorites', (req, res) =>{
  console.log("post favorites, req.body.id", req.body.id);
  req.app.get("db").postFavorites([req.body.id, req.user.id])
  .then(favorites => {
    res.status(200).json(favorites)
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

// VIEW FAVORITES
app.post('/api/viewfavorites', (req, res) => {
  // console.log('view faves', req.body)
  req.app.get("db").viewFavorites(req.body.favduser_id)
  .then( favorites => {
    // console.log("favorites from promise", favorites)
    res.status(200).json(favorites)
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

// DELETE FAVORITES
app.delete('/api/deletefave', (req, res) => {
console.log(req.body.favdprod_id)
  req.app.get("db").deleteFave(req.body.favdprod_id)
  .then(favorites => {
    console.log("delete faves server", favorites)
    res.status(200).json(favorites)
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

// UPDATE QUANTITY / PUT
app.put('/api/updatecart',(req, res) => {
  console.log("qty value from server", req.body);
  req.app.get("db").updateQty(req.body.qty, req.body.order_id).then(cart => {
    res.status(200).json(cart);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

// LOGOUT ENDPOINT / SESSION END
app.get('/api/logout', (req, res) => {
  req.session.destroy( () => {
    res.redirect('http://localhost:3000/#/');
  });
});

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.listen(port, () =>{
  console.log(`jammin' on teh Port: ${port} mon`);
});

// Hosting purposes
// Digital Ocean

// app.use(express.static(`${__dirname}/../build`))
// in terminal yarn build
// can then view build folder
// then const pth =require('path');


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build.index.html'));
// });

// ssh key thangs
// in terminal 
// save ssh key 

// create droplet
// in auth0 insert IP address in Allowed Web Origins & and Allowed CallbackURL (in call back URL suffix with 'callback')

// in terminal type: SST root@'given IP Address'

// in terminal
// apt-get update && apt-get dist-upgrade
// apt-get install nodejs -y;apt-get install npm -y;
// npm i -g n;

// in another terminal 
// from src type: node -v (to check version of node) 
// THEN type n "version of node"
// cd ~
// go to project (make sure you have most current code)
// go to your github account and grab URL to clone
// go back to droplet in terminal 
// type git clone and paste URL in root of ubuntu
// cd into new directory and creat new .env (touch .env)
// type nano .env (should bring you to terminal text editor)
// copy and paste .env file into this nano file
// anywhere Local host is you have to replace with IP Address
// get out of nano (ctrl x)
// select y (for yes)
// leave file as .env
// run npm i from root ubuntu (takes a while)
// type 'npm run build'
// node server/server.js
// go to ip address : 3001
// npm i -g pm2 (to keep website running)