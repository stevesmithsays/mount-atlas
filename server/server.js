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
    CLIENT_SECRET 
} = process.env;


massive(CONNECTION_STRING)
    .then(db => {
        app.set("db", db);
    })
    .catch(console.log);

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
);

app.use(passport.initialize());
app.use(passport.session()); 

passport.use(
    new Auth0Strategy({
        domain: DOMAIN,
        clientSecret: CLIENT_SECRET,
        clientID: CLIENT_ID,
        scope: "openid profile",
        callbackURL: "/auth"
    })
    // 12:00 part 5
);

app.get("/api/test", (req, res) => {
    req.app
    .get('db')
    .getUser()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

app.get('/login')

app.listen(port, () =>{
    console.log(`jammin' on teh Port: ${port} mon`);
});
