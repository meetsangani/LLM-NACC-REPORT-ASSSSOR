const express = require('express');
const router = express.Router();
// Fix import to destructure the authMiddleware function
const { authMiddleware } = require('../../../middleware/authMiddleware');
const studentController = require('../../../controllers/student/studentController');

// Route to get all students
router.get('/', authMiddleware, studentController.getAllStudents);

// Route to get a student by ID
router.get('/:id', authMiddleware, studentController.getStudentById);

// Route to create a new student
router.post('/', authMiddleware, studentController.createStudent);

// Route to update a student by ID
router.put('/:id', authMiddleware, studentController.updateStudent);

// Route to delete a student by ID
router.delete('/:id', authMiddleware, studentController.deleteStudent);

module.exports = router;