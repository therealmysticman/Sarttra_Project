const express = require('express');
const path = require('path');
const route = express.Router();

route.get('/', (req, res) => {
  console.log('Request at /')
  res.sendFile(path.join(__dirname, '..', '..',  'Webpage', 'Home.html'));
});

route.get('/dog', (req, res) => {
  console.log('Request at /dog')
  res.sendFile(path.join(__dirname, '..', '..', 'Webpage', 'Dog.html'));
});

route.get('/search', (req, res) => {
  console.log('Request at /search')
  res.redirect('/Product.html#search');
});

route.get('/login', (req, res) => {
  console.log('Request at /login')
  res.sendFile(path.join(__dirname, '..', '..', 'Webpage', 'Login.html'));
});

route.get('/register', (req, res) => {
  console.log('Request at /register')
  res.sendFile(path.join(__dirname, '..', '..', 'Webpage', 'Register.html'));
});

route.get('/request', (req, res) => {
  console.log('Request at /request')
  res.sendFile(path.join(__dirname, '..', '..', 'Webpage', 'Request.html'));
});

route.get('/reghome', (req, res) => {
  console.log('Request at /reghome')
  res.sendFile(path.join(__dirname, '..', '..', 'Webpage', 'HomeReg.html'));
});

route.get('/milo', (req, res) => {
  console.log('Request at /milo')
  res.sendFile(path.join(__dirname, '..', '..', 'Webpage', 'Milo.html'));
});

route.get('/namtarn', (req, res) => {
  console.log('Request at /namtarn')
  res.sendFile(path.join(__dirname, '..', '..', 'Webpage', 'Nam-Tarn.html'));
});

module.exports = route;
