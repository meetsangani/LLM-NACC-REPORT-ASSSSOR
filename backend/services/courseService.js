const Course = require('../models/course/Course');

exports.createCourse = async (courseData) => {
    try {
        const course = new Course(courseData);
        await course.save();
        return course;
    } catch (error) {
        throw new Error('Error creating course: ' + error.message);
    }
};

exports.getAllCourses = async () => {
    try {
        return await Course.find();
    } catch (error) {
        throw new Error('Error fetching courses: ' + error.message);
    }
};

exports.getCourseById = async (courseId) => {
    try {
        return await Course.findById(courseId);
    } catch (error) {
        throw new Error('Error fetching course: ' + error.message);
    }
};

exports.updateCourse = async (courseId, courseData) => {
    try {
        return await Course.findByIdAndUpdate(courseId, courseData, { new: true });
    } catch (error) {
        throw new Error('Error updating course: ' + error.message);
    }
};

exports.deleteCourse = async (courseId) => {
    try {
        await Course.findByIdAndDelete(courseId);
        return { message: 'Course deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting course: ' + error.message);
    }
};