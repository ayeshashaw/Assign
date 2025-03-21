const { readData, writeData } = require("../models/courseModel");

const getAllCourses = (filters, pagination) => {
    const data = readData();
    if (!data || !data.courses) return null;

    let courses = data.courses;

    if (filters.title) {
        courses = courses.filter(course => course.title.toLowerCase().includes(filters.title.toLowerCase()));
    }
    if (filters.description) {
        courses = courses.filter(course => course.description.toLowerCase().includes(filters.description.toLowerCase()));
    }
    if (filters.level) {
        courses = courses.filter(course => course.level.toLowerCase() === filters.level.toLowerCase());
    }

    const { page = 1, limit = 5 } = pagination;
    const startIdx = (page - 1) * limit;
    const paginatedCourses = courses.slice(startIdx, startIdx + limit);

    return { total: courses.length, courses: paginatedCourses };
};

const getCourseById = (id) => {
    const data = readData();
    if (!data || !data.courses) return null;
    return data.courses.find(course => course.id === id);
};

const updateCourse = (id, updatedFields) => {
    const data = readData();
    if (!data || !data.courses) return null;

    const courseIndex = data.courses.findIndex(course => course.id === id);
    if (courseIndex === -1) return null;

    if (updatedFields.title && updatedFields.title.length < 3) return { error: "Title must be at least 3 characters long" };
    if (updatedFields.description && updatedFields.description.length < 10) return { error: "Description must be at least 10 characters long" };
    if (updatedFields.level && !["beginner", "intermediate", "advanced"].includes(updatedFields.level.toLowerCase())) {
        return { error: "Invalid level. Allowed: beginner, intermediate, advanced" };
    }

    if (updatedFields.enrollments !== undefined && (!Number.isInteger(updatedFields.enrollments) || updatedFields.enrollments < 0)) {
        return { error: "Enrollments must be a non-negative integer" };
    }

    data.courses[courseIndex] = { ...data.courses[courseIndex], ...updatedFields };
    writeData(data);

    return data.courses[courseIndex];
};

const getCoursesSummary = () => {
    const data = readData();
    if (!data || !data.courses) return null;

    const totalCourses = data.courses.length;
    const totalEnrollments = data.courses.reduce((sum, course) => sum + (course.enrollments || 0), 0);
    const avgEnrollments = totalCourses > 0 ? (totalEnrollments / totalCourses).toFixed(2) : 0;
    const avgDuration = totalCourses > 0 ? (data.courses.reduce((sum, course) => sum + course.duration, 0) / totalCourses).toFixed(2) : 0;

    return { totalCourses, avgEnrollments, avgDuration };
};

module.exports = { getAllCourses, getCourseById, updateCourse, getCoursesSummary };
