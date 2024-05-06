const express = require('express');
const router = express.Router();
const connectToDatabase = require('../database');
const connection = connectToDatabase();
const JWT_SECRET = 'forex123';
const jwt = require('jsonwebtoken');
// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Please provide a token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        if(data.id==13)
    {    next(); 
    }else
    res.status(401).json({ error: "Invalid token" });
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

router.post('/attendanceGenerator', verifyToken, function (req, res) {
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentHour = currentDate.getHours();
    console.log(currentHour);
    if (currentHour >= 22||(currentHour >=0&&currentHour<=2)) {
        // If the current hour is 22 (10 PM) or later, it's close to midnight,
        // so we add 2 days instead of 1 to ensure we get the next day's date
        currentDate.setDate(currentDate.getDate() + 2);
    } else {
        // Otherwise, we add 1 day to get the next day's date
        currentDate.setDate(currentDate.getDate() + 1);
    }
    const formattedDate = currentDate.toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'
     currentDate = formattedDate;
    const excludedStudentID = 13; // ID of the student to exclude
    // Fetch list of all students
    const sqlStudents = `
        SELECT ID FROM Student
    `;
    connection.query(sqlStudents, (err, students) => {
        if (err) {
            console.error('Error fetching students:', err);
            res.status(500).send('Error fetching students');
            return;
        }

        // Filter out excluded student
        const studentsToGenerate = students.filter(student => student.ID !== excludedStudentID);

        // Fetch existing attendance for current day
        const sqlSelectExistingAttendance = `
            SELECT StudentID FROM Attendance WHERE Date = ?
        `;
        connection.query(sqlSelectExistingAttendance, [currentDate], (err, existingAttendance) => {
            if (err) {
                console.error('Error fetching existing attendance:', err);
                res.status(500).send('Error fetching existing attendance');
                return;
            }

            // Extract student IDs for whom attendance is already present
            const presentStudents = existingAttendance.map(attendance => attendance.StudentID);

            // Filter out students for whom attendance is not yet generated
            const studentsToGenerateFiltered = studentsToGenerate.filter(student => !presentStudents.includes(student.ID));

            // Insert attendance for students for whom it is not yet generated
            const sqlInsert = `
            INSERT INTO Attendance (StudentID, Date, Status)
            VALUES ?
        `;
        const attendanceValues = studentsToGenerateFiltered.map(student => [student.ID, currentDate, 'P']);
        if (attendanceValues.length === 0) {
            console.log('No attendance to insert');
            res.status(200).send('No attendance to insert');
            return;
        }
            connection.query(sqlInsert, [attendanceValues], (err, result) => {
                if (err) {
                    console.error('Error inserting attendance:', err);
                    res.status(500).send('Error inserting attendance');
                    return;
                }
                console.log('Attendance generated successfully');
                
                // Fetch inserted attendance
                const sqlSelect = `
                    SELECT * FROM Attendance WHERE Date = ?
                `;
                connection.query(sqlSelect, [currentDate], (err, rows) => {
                    if (err) {
                        console.error('Error fetching inserted attendance:', err);
                        res.status(500).send('Error fetching inserted attendance');
                        return;
                    }
                    console.log('Inserted attendance fetched successfully');
                    res.status(200).json(rows);
                });
            });
        });
    });
});



router.get('/allattendance', verifyToken, function (req, res) {
    const sql = `
        SELECT Attendance.*, Student.ID AS StudentID, Student.Name AS StudentName
        FROM Attendance
        INNER JOIN Student ON Attendance.StudentID = Student.ID
    `;
    connection.query(sql, (err, rows) => {
        if (err) {
            console.error('Error fetching attendance:', err);
            res.status(500).send('Error fetching attendance');
            return;
        }
        console.log('Attendance fetched successfully');
        res.status(200).json(rows);
    });
});


router.put('/markAttendance', verifyToken, function (req, res) {
    const attendanceData = req.body.attendanceData;
    attendanceData.forEach((attendance) => {
        let { id, date, status } = attendance;

        // Convert date string to a Date object
        const attendanceDate = new Date(date);

        // Subtract one day from the date
        attendanceDate.setDate(attendanceDate.getDate() + 1);

        // Update the date string in the attendance object
        date = attendanceDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD

        const sql = `
            UPDATE Attendance
            SET Status = ?
            WHERE StudentID = ? AND Date = ?
        `;
        connection.query(sql, [status, id, date], (err, result) => {
            if (err) {
                console.error('Error updating attendance:', err);
                return;
            }
            
            // console.log(`Attendance updated successfully for student ${id} on ${date}`, result);
        });
    });

    res.status(200).send('Attendance updated successfully');
});



module.exports = router;