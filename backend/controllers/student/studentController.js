const Student = require('../../models/student/Student');
const studentService = require('../../services/studentService');

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const studentData = req.body;
        const newStudent = await studentService.createStudent(studentData);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await studentService.getStudentById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error });
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const updatedData = req.body;
        const updatedStudent = await studentService.updateStudent(studentId, updatedData);
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error });
    }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const deletedStudent = await studentService.deleteStudent(studentId);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
};