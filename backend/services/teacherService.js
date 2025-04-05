const Teacher = require('../models/teacher/Teacher');

// Function to create a new teacher
const createTeacher = async (teacherData) => {
    const teacher = new Teacher(teacherData);
    return await teacher.save();
};

// Function to get all teachers
const getAllTeachers = async () => {
    return await Teacher.find();
};

// Function to get a teacher by ID
const getTeacherById = async (teacherId) => {
    return await Teacher.findById(teacherId);
};

// Function to update a teacher by ID
const updateTeacher = async (teacherId, updateData) => {
    return await Teacher.findByIdAndUpdate(teacherId, updateData, { new: true });
};

// Function to delete a teacher by ID
const deleteTeacher = async (teacherId) => {
    return await Teacher.findByIdAndDelete(teacherId);
};

module.exports = {
    createTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
};