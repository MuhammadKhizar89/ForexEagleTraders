require("dotenv").config();
const connectToDatabase = require('./database');
const express = require("express");
const app = express();
const cors = require("cors");
// Middleware
app.use(cors({
    origin: "*"
}));
app.use(express.json()); 
const connection = connectToDatabase();
function CreateTables() {
    const sqlStudent = `
        CREATE TABLE IF NOT EXISTS Student (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            Name VARCHAR(255) NOT NULL,
            Email VARCHAR(255) NOT NULL,
            PhoneNumber VARCHAR(20) NOT NULL ,
            Password VARCHAR(255) NOT NULL
        )
    `;

    const sqlAttendance = `
        CREATE TABLE IF NOT EXISTS Attendance (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            StudentID INT,
            Date DATE,
            Status VARCHAR(20),
            FOREIGN KEY (StudentID) REFERENCES Student(ID) ON DELETE CASCADE ON UPDATE CASCADE
        )
    `;
    
    connection.query(sqlStudent, (err, result) => {
        if (err) {
            console.error('Error creating Student table:', err);
            return;
        }
        console.log('Student table created successfully');
    });

    connection.query(sqlAttendance, (err, result) => {
        if (err) {
            console.error('Error creating Attendance table:', err);
            return;
        }
        console.log('Attendance table created successfully');
    });
}
CreateTables();

app.get("/", (req,res)=>{
    res.status(200).send("hello world")
})

app.use('/Student', require('./StudentRoutes/StudentInfoRoute'));
app.use('/Admin', require('./AdminRoutes/AdminAttendenceRoute'));
const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
