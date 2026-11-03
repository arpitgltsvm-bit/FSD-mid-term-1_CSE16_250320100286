
const express = require('express');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Student records
let students = [];

// TASK 2: Create Student Records
app.post('/api/students', (req, res) => {

    const { id, name, email, course, age } = req.body;

    // Validate fields
    if (!id || !name || !email || !course || !age) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Check duplicate ID
    const exists = students.find(s => s.id == id);

    if (exists) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    const student = { id, name, email, course, age };

    students.push(student);

    res.status(201).json({
        message: "Student created successfully",
        student: student
    });
});


// TASK 3: Retrieve All Students
app.get('/api/students', (req, res) => {

    res.status(200).json({
        message: "All student records",
        students: students
    });
});


// TASK 3: Retrieve Student By ID
app.get('/api/students/:id', (req, res) => {

    const student = students.find(
        s => s.id == req.params.id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});


// TASK 4: Update Student Details
app.put('/api/students/:id', (req, res) => {

    const id = req.params.id;

    const { name, email, course, age } = req.body;

    // Validate fields
    if (!name || !email || !course || !age) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const student = students.find(
        s => s.id == id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    // Update student details
    student.name = name;
    student.email = email;
    student.course = course;
    student.age = age;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});


// TASK 5: Delete Student Records
app.delete('/api/students/:id', (req, res) => {

    const index = students.findIndex(
        s => s.id == req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    // Delete student
    students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully"
    });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
