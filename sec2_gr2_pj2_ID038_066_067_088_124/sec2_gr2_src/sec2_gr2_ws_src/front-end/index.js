const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const session = require('express-session');

// Initialize the session middleware
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '..', '..', 'Phase 1 Web')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Request at /')
  res.sendFile(path.join(__dirname, '..', '..',  'Phase 1 Web', 'Home.html'));
});

app.get('/product', (req, res) => {
  console.log('Request at /product')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'Product.html'));
});

app.get('/search', (req, res) => {
  console.log('Request at /search')
  res.redirect('/Product.html#search');
});

app.get('/login', (req, res) => {
  console.log('Request at /login')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'Login.html'));
});
app.post('/login', (req, res) => {
    res.redirect('/login');
  });

app.get('/register', (req, res) => {
  console.log('Request at /register')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'Register.html'));
});

app.get('/aboutus', (req, res) => {
  console.log('Request at /aboutus')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'AboutUs.html'));
});

app.get('/product001', (req, res) => {
  console.log('Request at /product001')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'GrilledSeaBass_withMisoSauce.html'));
});

app.get('/product002', (req, res) => {
  console.log('Request at /product002')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'ClearSoupWithOmlete.html'));
});

app.get('/product003', (req, res) => {
  console.log('Request at /product003')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'SpicyMixedVegetableSoup.html'));
});

app.get('/product004', (req, res) => {
  console.log('Request at /product004')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'BoiledRiceWithGrouper.html'));
});

app.get('/product005', (req, res) => {
  console.log('Request at /product005')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'SpicyChickenSoupWithMushroom.html'));
});

app.get('/accountmanage', (req, res) => {
  console.log('Request at /accountmanage')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'Account.html'));
});

app.get('/productmanage', (req, res) => {
  console.log('Request at /productmanage')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', 'ProductManage.html'));
});

app.get('/6488038aboutus', (req, res) => {
  console.log('Request at /6488038aboutus')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', '6488038_aboutus.html'));
});

app.get('/6488066aboutus', (req, res) => {
  console.log('Request at /6488066aboutus')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', '6488066_aboutus.html'));
});

app.get('/6488067aboutus', (req, res) => {
  console.log('Request at /6488067aboutus')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', '6488067_aboutus.html'));
});

app.get('/6488088aboutus', (req, res) => {
  console.log('Request at /6488088aboutus')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', '6488088_aboutus.html'));
});

app.get('/6488124aboutus', (req, res) => {
  console.log('Request at /6488124aboutus')
  res.sendFile(path.join(__dirname, '..', '..', 'Phase 1 Web', '6488124_aboutus.html'));
});

app.listen(port, () => {
  console.log(`Frontend server listening at http://localhost:${port}`)
});
