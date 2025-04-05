const Student = require('../models/student/Student');

const createStudent = async (studentData) => {
    const student = new Student(studentData);
    return await student.save();
};

const getStudentById = async (studentId) => {
    return await Student.findById(studentId);
};

const getAllStudents = async () => {
    return await Student.find({});
};

const updateStudent = async (studentId, updatedData) => {
    return await Student.findByIdAndUpdate(studentId, updatedData, { new: true });
};

const deleteStudent = async (studentId) => {
    return await Student.findByIdAndDelete(studentId);
};

module.exports = {
    createStudent,
    getStudentById,
    getAllStudents,
    updateStudent,
    deleteStudent,
};