const Teacher = require('../../models/teacher/Teacher');
const teacherService = require('../../services/teacherService');

// Get all teachers
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await teacherService.getAllTeachers();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving teachers', error });
    }
};

// Get a teacher by ID
exports.getTeacherById = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await teacherService.getTeacherById(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving teacher', error });
    }
};

// Create a new teacher
exports.createTeacher = async (req, res) => {
    const newTeacher = req.body;
    try {
        const createdTeacher = await teacherService.createTeacher(newTeacher);
        res.status(201).json(createdTeacher);
    } catch (error) {
        res.status(500).json({ message: 'Error creating teacher', error });
    }
};

// Update a teacher
exports.updateTeacher = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedTeacher = await teacherService.updateTeacher(id, updatedData);
        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ message: 'Error updating teacher', error });
    }
};

// Delete a teacher
exports.deleteTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTeacher = await teacherService.deleteTeacher(id);
        if (!deletedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting teacher', error });
    }
};