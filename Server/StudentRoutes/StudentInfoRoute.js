const express = require('express');
const router = express.Router();
const connectToDatabase = require('../database');
const connection = connectToDatabase();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'forex123';
const verifyToken = require('./fetchusermiddleware');
router.post('/register', function (req, res) {
    const { name, email, phoneNumber, password } = req.body;
    if (!name || !email || !phoneNumber || !password) {
        return res.status(400).json({ error: 'Please provide name, email, phone number, and password' });
    }
    const checkEmailSql = `
        SELECT * FROM Student WHERE Email = ?
    `;
    connection.query(checkEmailSql, [email], (err, rows) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (rows.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        const insertSql = `
            INSERT INTO Student (Name, Email, PhoneNumber, Password)
            VALUES (?, ?, ?, ?)
        `;
        connection.query(insertSql, [name, email, phoneNumber, password], (err, result) => {
            if (err) {
                console.error('Error storing Student information:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            sendEmail(name, email, phoneNumber);
            // Generate JWT token with student ID
            const studentId = result.insertId;
            const token = jwt.sign({ id: studentId }, JWT_SECRET);
            return res.status(200).json({ message: 'Student information stored successfully', token });
        });
    });
});
async function sendEmail(name, email, phoneNumber) {
    const transporter = nodemailer.createTransport({
       service: "gmail",
        auth: {
          user: "muhammadkhizar8919@gmail.com",
          pass: "lsns zhbl hsdz uaxu",
        },
      });
      async function main() {
        const info = await transporter.sendMail({
            from: '"Forex Trading" <ForexTrading@example.com>', // Sender address
            to: "forexeaglestraders@gmail.com", // List of receivers
            subject: 'New Student Information', // Email subject
            html: `
                <html>
                <head>
                    <style>
                        /* CSS styles */
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                        }
                        p {
                            margin: 10px 0;
                        }
                        .highlight {
                            color: #007bff;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>New Student Information</h1>
                        <p><span class="highlight">Name:</span> ${name}</p>
                        <p><span class="highlight">Email:</span> ${email}</p>
                        <p><span class="highlight">Phone Number:</span> ${phoneNumber}</p>
                    </div>
                </body>
                </html>
            `,
        });
        console.log("Message sent: %s", info.messageId);
      }
      main().catch(console.error);
    }

    router.post('/login', function (req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }
        console.log("before sqling");
        const loginSql = `
            SELECT * FROM Student WHERE Email = ? AND Password = ?
        `;
        connection.query(loginSql, [email, password], (err, rows) => {
            if (err) {
                console.error('Error during login:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (rows.length === 0) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            // User authenticated successfully
            const user = rows[0];
            // Generate JWT token with student ID
            const token = jwt.sign({ id: user.ID }, JWT_SECRET);
            return res.status(200).json({ message: 'Login successful', user, token });
        });
    });
 
  
    router.get('/getUserAttendance', verifyToken, function (req, res) {
        const userId = req.userId; // Get user ID from the request object (attached by the middleware)
        const getUserAttendanceSql = `SELECT * FROM Attendance WHERE StudentID = ?`;
        connection.query(getUserAttendanceSql, [userId], (err, rows) => {
            if (err) {
                console.error('Error fetching user attendance:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json({ attendance: rows });
        });
    });
    

    router.get('/getUserInfo', verifyToken, function (req, res) {
        const userId = req.userId; // Get user ID from the request object (attached by the middleware)
        const getUserInfoSql = `SELECT Name, Email, PhoneNumber FROM Student WHERE ID = ?`;
        connection.query(getUserInfoSql, [userId], (err, rows) => {
            if (err) {
                console.error('Error fetching user info:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (rows.length === 0) {
                // User not found
                return res.status(404).json({ error: 'User not found' });
            }
            // User info found, remove password field if it exists
            const userInfo = rows[0];
            delete userInfo.Password;
            res.status(200).json({ user: userInfo });
        });
    });
    
    module.exports = router;
