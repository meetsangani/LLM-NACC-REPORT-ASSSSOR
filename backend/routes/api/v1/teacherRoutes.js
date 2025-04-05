const express = require('express');
const router = express.Router();
// Fix import to destructure the authMiddleware function
const { authMiddleware } = require('../../../middleware/authMiddleware');
const teacherController = require('../../../controllers/teacher/teacherController');

// Route to get all teachers
router.get('/', authMiddleware, teacherController.getAllTeachers);

// Route to get a teacher by ID
router.get('/:id', authMiddleware, teacherController.getTeacherById);

// Route to create a new teacher
router.post('/', authMiddleware, teacherController.createTeacher);

// Route to update a teacher by ID
router.put('/:id', authMiddleware, teacherController.updateTeacher);

// Route to delete a teacher by ID
router.delete('/:id', authMiddleware, teacherController.deleteTeacher);

module.exports = router;