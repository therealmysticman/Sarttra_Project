const express = require('express');
const path = require('path');
const route = express.Router();

route.get('/', (req, res) => {
  console.log('Request at /')
  res.sendFile(path.join(__dirname, '..', '..',  'Phase 1 Web', 'Home.html'));
});

route.get('/product', (req, res) => {
  console.log('Request at /product')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'Product.html'));
});

route.get('/search', (req, res) => {
  console.log('Request at /search')
  res.redirect('/Product.html#search');
});

route.get('/login', (req, res) => {
  console.log('Request at /login')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'Login.html'));
});

route.get('/register', (req, res) => {
  console.log('Request at /register')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'Register.html'));
});

route.get('/aboutus', (req, res) => {
  console.log('Request at /aboutus')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'AboutUs.html'));
});

route.get('/product001', (req, res) => {
  console.log('Request at /product001')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'GrilledSeaBass_withMisoSauce.html'));
});

route.get('/product002', (req, res) => {
  console.log('Request at /product002')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'ClearSoupWithOmlete.html'));
});

route.get('/product003', (req, res) => {
  console.log('Request at /product003')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'SpicyMixedVegetableSoup.html'));
});

route.get('/product004', (req, res) => {
  console.log('Request at /product004')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'BoiledRiceWithGrouper.html'));
});

route.get('/product005', (req, res) => {
  console.log('Request at /product005')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'SpicyChickenSoupWithMushroom.html'));
});

route.get('/accountmanage', (req, res) => {
  console.log('Request at /accountmanage')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'Account.html'));
});

route.get('/productmanage', (req, res) => {
  console.log('Request at /productmanage')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'ProductManage.html'));
});

route.get('/6488038aboutus', (req, res) => {
  console.log('Request at /6488038aboutus')
  res.sendFile(path.join(__dirname, '..', '..',  'Phase 1 Web', '6488038_aboutus.html'));
});

route.get('/6488066aboutus', (req, res) => {
  console.log('Request at /6488066aboutus')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', '6488066_aboutus.html'));
});

route.get('/6488067aboutus', (req, res) => {
  console.log('Request at /6488067aboutus')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', '6488067_aboutus.html'));
});

route.get('/6488088aboutus', (req, res) => {
  console.log('Request at /6488088aboutus')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', '6488088_aboutus.html'));
});

route.get('/6488124aboutus', (req, res) => {
  console.log('Request at /6488124aboutus')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', '6488124_aboutus.html'));
});
module.exports = route;
