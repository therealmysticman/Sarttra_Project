const express = require('express');
const db = require('./database');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM UserLogin WHERE UserUsername = ? AND UserPass = ?',
    [username, password],
    (error, results) => {
      if (error) {
        res.json({ success: false, error: error.message });
      } else if (results.length > 0) {
        // login successful, create session and return success response
        req.session.authenticated = true;
        console.log("login success")
        res.redirect('/reghome');
      } else {
        // login failed, return error response
        console.log("login failed")
        res.redirect('/login');
      }
    }
  );
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, nickname, email, mobile, citizenid, birthdate, address, username, password } = req.body;

  try {
    // Generate an AdminID
    const UserID = generateUserID();
  

    // Insert the user data into the AdminInformation table
    const [result] = await db.promise().execute(
      `INSERT INTO UserInformation(UserID, UserFname, UserLname, UserNname, UserEmail,UserPhone,UserCitizenID,UserBirthdate,UserAddress) VALUES (?,?,?,?,?,?,?,?,?)`,
      [UserID, firstName, lastName, nickname, email, mobile, citizenid, birthdate, address]
    );
    
    console.log("Registration Complete");
    

    // Insert the user login data into the AdminLogin table
    const [loginResult] = await db.promise().execute(
      `INSERT INTO UserLogin(ID_User, UserUsername, UserPass) VALUES (?,?,?)`,
      [UserID, username, password,]
    );

    // Retrieve the inserted user data from the AdminInformation table
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.redirect('/register');
  }
});

function generateUserID() {
  // Generate a random 7-character alphanumeric string
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

module.exports = router;