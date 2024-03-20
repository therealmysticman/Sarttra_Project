const express = require('express');
const db = require('./database');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM AdminLogin WHERE AdminUser = ? AND AdminPass = ?',
    [username, password],
    (error, results) => {
      if (error) {
        res.json({ success: false, error: error.message });
      } else if (results.length > 0) {
        // login successful, create session and return success response
        req.session.authenticated = true;
        res.redirect('/');
      } else {
        // login failed, return error response
        res.redirect('/login');
      }
    }
  );
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, nickname, email, mobile, username, password } = req.body;

  try {
    // Generate an AdminID
    const AdminID = generateAdminID();
    const AdminRole = generateAdminRole();

    // Insert the user data into the AdminInformation table
    const [result] = await db.promise().execute(
      `INSERT INTO AdminInformation(AdminID, AdminFname, AdminLname, AdminNname, AdminEmail, AdminPhone) VALUES (?,?,?,?,?,?)`,
      [AdminID, firstName, lastName, nickname, email, mobile]
    );

    // Insert the user login data into the AdminLogin table
    const [loginResult] = await db.promise().execute(
      `INSERT INTO AdminLogin(ID_Admin, AdminUser, AdminPass, AdminRole, LoginLog) VALUES (?,?,?,?, NOW())`,
      [AdminID, username, password, AdminRole]
    );

    // Retrieve the inserted user data from the AdminInformation table
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.redirect('/register');
  }
});

function generateAdminID() {
  // Generate a random 7-character alphanumeric string
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateAdminRole() {
  const roles = ['Web developer', 'Database manager', 'Web designer', 'Receptionist', 'Graphic design', 'Mascot'];
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
}

module.exports = router;