require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./database');
const navbar = require('./navbar');
const auth = require('./auth');
const app = express()
// Import the express-session module
const session = require('express-session');

// Initialize the session middleware
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '..', '..','Webpage')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//MAKE ID FOR NAV BAR
app.use('/', navbar);

app.use(auth);
app.listen(process.env.PORT, () => {
  console.log(`Backend server listening at http://localhost:${process.env.PORT}`);
});
