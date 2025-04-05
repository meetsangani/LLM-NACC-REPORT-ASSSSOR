const Course = require('../../models/course/Course');
const courseService = require('../../services/courseService');

// Create a new course
exports.createCourse = async (req, res) => {
    try {
        const courseData = req.body;
        const newCourse = await courseService.createCourse(courseData);
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error });
    }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
};

// Get a course by ID
exports.getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await courseService.getCourseById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error });
    }
};

// Update a course
exports.updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const updatedData = req.body;
        const updatedCourse = await courseService.updateCourse(courseId, updatedData);
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const deletedCourse = await courseService.deleteCourse(courseId);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error });
    }
};