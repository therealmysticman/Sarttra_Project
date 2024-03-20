const express = require('express');
const db = require('./database');

const router = express.Router();
//FOR POSTMAN TEST
//FOR ADMINISTRATION
// router.get /reg this will return all search result since there is no criteria
//Testing: No criteria search
//method: GET
//URL(use this for test): localhost:3030/reg , http://localhost:3030/reg
router.get('/reg', async (req, res) => {
    try {
        const [UserData] = await db.promise().execute(
            `SELECT * FROM AdminInformation`,
        );
        const [UserData2] = await db.promise().execute(
            `SELECT * FROM AdminLogin`,
        );
        const data = {
            adminInformation: UserData,
            adminLogin: UserData2
        };
        console.log(data); // Log the merged data to the console
        return res.status(200).json({ error: false, data: data, message: "User successfully retrieved" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Error retrieving user data' });
    }
});

//router.get /reg/:id : this will return all of admin data that have matched input ID
//Testing: Criteria Search (Search By ID) : 1st criteria
//method: GET
//URL(use this for test): localhost:3030/reg/6488088 , http://localhost:3030/reg/6488088 , localhost:3030/reg/6488067 , http://localhost:3030/reg/6488067
router.get('/reg/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the admin ID from the request parameters
        const [UserData] = await db.promise().execute(
            `SELECT * FROM AdminInformation WHERE AdminID = ?`, [id] // Use the admin ID in the SQL query
        );
        const [UserData2] = await db.promise().execute(
            `SELECT * FROM AdminLogin WHERE ID_Admin = ?`, [id] // Use the admin ID in the SQL query
        );
        if (UserData && UserData2) {
            const data = {
                adminInformation: UserData[0], // The result of the SQL query is an array, so we need to access the first element
                adminLogin: UserData2[0]
            };
            console.log(data); // Log the merged data to the console
            return res.status(200).json({ error: false, data: data, message: "User successfully retrieved" });
        } else {
            return res.status(404).json({ error: true, message: "Admin not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Error retrieving admin data' });
    }
});

// router.get /reg/adminrole/:AdminRole : this will return all of admin data that have matched Admin role
//Testing: Criteria Search (Search By Admin role) : 2nd criteria
//method: GET
//URL(use this for test): localhost:3030/reg/adminrole/Mascot , http://localhost:3030/reg/adminrole/Mascot , localhost:3030/reg/adminrole/Web designer, http://localhost:3030/reg/adminrole/Web designer
router.get('/reg/adminrole/:AdminRole', async (req, res) => {
    try {
        const { AdminRole } = req.params;
        const [result] = await db.promise().execute(
            `SELECT AdminInformation.AdminID, AdminInformation.AdminFname, AdminInformation.AdminLname, AdminInformation.AdminNname, AdminInformation.AdminEmail, AdminInformation.AdminPhone, AdminLogin.AdminUser, AdminLogin.AdminPass, AdminLogin.AdminRole, AdminLogin.LoginLog 
        FROM AdminInformation 
        JOIN AdminLogin ON AdminInformation.AdminID = AdminLogin.ID_Admin 
        WHERE AdminLogin.AdminRole = ?`,
            [AdminRole]
        );

        const adminInformation = result.map((row) => ({
            AdminID: row.AdminID,
            AdminFname: row.AdminFname,
            AdminLname: row.AdminLname,
            AdminNname: row.AdminNname,
            AdminEmail: row.AdminEmail,
            AdminPhone: row.AdminPhone,
        }));

        const adminLogin = result.map((row) => ({
            ID_Admin: row.AdminID,
            AdminUser: row.AdminUser,
            AdminPass: row.AdminPass,
            AdminRole: row.AdminRole,
            LoginLog: row.LoginLog,
        }));

        return res.status(200).json({
            error: false,
            data: {
                adminInformation,
                adminLogin,
            },
            message: "Admin data successfully retrieved",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Error retrieving admin data' });
    }
});

// router.get /reg/adminuser/:adminuser : this will return all of admin data that have matched Admin username
//Testing: Criteria Search (Search By Admin username) : 3rd criteria
//method: GET
//URL(use this for test): localhost:3030/adminuser/Kanyaveeza , http://localhost:3030/reg/adminuser/Kanyaveeza , localhost:3030/reg/adminuser/SarttraYipPree, http://localhost:3030/reg/adminuser/SarttraYipPree
router.get('/reg/adminuser/:adminuser', async (req, res) => {
    try {
        const { adminuser } = req.params;
        const [result] = await db.promise().execute(
            `SELECT AdminInformation.AdminID, AdminInformation.AdminFname, AdminInformation.AdminLname, AdminInformation.AdminNname, AdminInformation.AdminEmail, AdminInformation.AdminPhone, AdminLogin.AdminUser, AdminLogin.AdminPass, AdminLogin.AdminRole, AdminLogin.LoginLog 
        FROM AdminInformation 
        JOIN AdminLogin ON AdminInformation.AdminID = AdminLogin.ID_Admin 
        WHERE AdminLogin.AdminUser = ?`,
            [adminuser]
        );

        const adminInformation = result.map((row) => ({
            AdminID: row.AdminID,
            AdminFname: row.AdminFname,
            AdminLname: row.AdminLname,
            AdminNname: row.AdminNname,
            AdminEmail: row.AdminEmail,
            AdminPhone: row.AdminPhone,
        }));

        const adminLogin = result.map((row) => ({
            ID_Admin: row.AdminID,
            AdminUser: row.AdminUser,
            AdminPass: row.AdminPass,
            AdminRole: row.AdminRole,
            LoginLog: row.LoginLog,
        }));

        return res.status(200).json({
            error: false,
            data: {
                adminInformation,
                adminLogin,
            },
            message: "Admin data successfully retrieved",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Error retrieving admin data' });
    }
});

// router.post /reg : this will add a new administrator data to the system
//Testing:  Insert a new administrator
//method: POST
//URL: localhost:3030/reg
//body: raw JSON
//Test case here:
//1st Test case:
//{
//  "AdminID": "328569",
//  "AdminFname": "James",
//  "AdminLname": "Sunderland",
//  "AdminNname": "SH2",
//  "AdminEmail": "silenthill@hotmail.com",
//  "AdminPhone": "085-669-8545",
//  "AdminUser": "JameZAP",
// "AdminPass": "nopassword",
//  "AdminRole": "Mascot"
//}
//2nd Test Case:
//{
//  "AdminID": "041269",
//  "AdminFname": "Leon",
//  "AdminLname": "Scott",
//  "AdminNname": "RE4",
//  "AdminEmail": "ashley@hotmail.com",
//  "AdminPhone": "095-566-8551",
//  "AdminUser": "Bio4RE",
//  "AdminPass": "nothankbro",
//  "AdminRole": "Web designer"
//}
router.post('/reg', async (req, res) => {
    try {
        // Destructure the required fields from the request body
        const { AdminID, AdminFname, AdminLname, AdminNname, AdminEmail, AdminPhone, AdminUser, AdminPass, AdminRole } = req.body;

        // Insert a new row into the AdminInformation table
        const [AdminInformation] = await db.promise().execute(
            `INSERT INTO AdminInformation (AdminID,AdminFname, AdminLname, AdminNname, AdminEmail, AdminPhone) VALUES (?, ?, ?, ?, ?, ?)`,
            [AdminID, AdminFname, AdminLname, AdminNname, AdminEmail, AdminPhone]
        );

        // Insert a new row into the AdminLogin table, using the AdminInformation ID as a foreign key
        const [AdminLogin] = await db.promise().execute(
            `INSERT INTO AdminLogin (ID_Admin, AdminUser, AdminPass, AdminRole) VALUES (?, ?, ?, ?)`,
            [AdminID, AdminUser, AdminPass, AdminRole]
        );

        // Return a success response to the client
        return res.status(200).json({ error: false, message: 'Admin registration successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Error registering admin' });
    }
});

// router.put /reg/:id : this will add a new administrator data to the system
//Testing:  update a new administrator data in required ID
//method: PUT
//URL: localhost:3030/reg/6488124 , localhost:3030/reg/6488066 , or localhost:3030/reg/6488088
//body: raw JSON
//Test case here:
//1st Test case:
//{
//"AdminFname": "Krauser",
//"AdminLname": "Kiki",
//"AdminNname": "Klause",
//"AdminEmail": "merceneries@hotmail.com",
//"AdminPhone": "025-647-8845",
//"AdminUser": "Inwkrauser",
//"AdminPass": "rook555",
//"AdminRole": "Database manager"
//}
//2nd Test Case:
//{
//  "AdminFname": "Chayanisa",
//  "AdminLname": "Chukiatphatnakij",
//  "AdminNname": "Mind",
//  "AdminEmail": "melodymind@gmail.com",
//  "AdminPhone": "061-033-8945",
//  "AdminUser": "Conductress",
//  "AdminPass": "ilovegirl",
//  "AdminRole": "Receptionist"
//}

router.put('/reg/:id', async (req, res) => {
    const { id } = req.params; // Get the admin ID from the request parameters

    try {
        // Destructure the required fields from the request body
        const { AdminFname, AdminLname, AdminNname, AdminEmail, AdminPhone, AdminUser, AdminPass, AdminRole } = req.body;

        // Update the row in the AdminInformation table
        await db.promise().query(
            `UPDATE AdminInformation SET AdminFname = ?, AdminLname = ?, AdminNname = ?, AdminEmail = ?, AdminPhone = ? WHERE AdminID = ?`,
            [AdminFname, AdminLname, AdminNname, AdminEmail, AdminPhone, id]
        );

        // Update the row in the AdminLogin table
        await db.promise().query(
            `UPDATE AdminLogin SET AdminUser = ?, AdminPass = ?, AdminRole = ? WHERE ID_Admin = ?`,
            [AdminUser, AdminPass, AdminRole, id]
        );

        // Return a success response to the client
        return res.status(200).json({ error: false, message: 'Admin information updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Error updating admin information' });
    }
});

// router.delete /reg/:id : this will delete an administrator data that matched required ID in the system
//Testing:  delete an administrator data in required ID
//method: DELETE
//URL: localhost:3030/reg/6488067, localhost:3030/reg/6488038 , or localhost:3030/reg/6666666
router.delete('/reg/:id', (req, res) => {
    const { id } = req.params; // Get the admin ID from the request parameters

    // Delete the admin login data from the AdminLogin table
    db.query(`DELETE FROM AdminLogin WHERE ID_Admin = ?`, [id], (err, result1) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: true, message: 'Error deleting admin data' });
        }

        // Delete the admin information from the AdminInformation table
        db.query(`DELETE FROM AdminInformation WHERE AdminID = ?`, [id], (err, result2) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: true, message: 'Error deleting admin data' });
            }

            // If both deletes were successful, send a success response
            if (result1.affectedRows > 0 && result2.affectedRows > 0) {
                return res.status(200).json({ error: false, message: "Admin successfully deleted" });
            } else {
                return res.status(404).json({ error: true, message: "Admin not found" });
            }
        });
    });
});

//FOR POSTMAN TEST END HERE
module.exports = router;