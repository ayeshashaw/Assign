const { getAllCourses, getCourseById, updateCourse, getCoursesSummary } = require("../services/courseService");

const getCoursesHandler = (req, res) => {
    const filters = { title: req.query.title, description: req.query.description, level: req.query.level };
    const pagination = { page: parseInt(req.query.page) || 1, limit: parseInt(req.query.limit) || 5 };

    const result = getAllCourses(filters, pagination);
    if (!result) return res.status(500).json({ error: "Courses data not found" });

    res.json(result);
};

const getCourseByIdHandler = (req, res) => {
    const course = getCourseById(parseInt(req.params.id));
    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json(course);
};

const updateCourseHandler = (req, res) => {
    const updatedCourse = updateCourse(parseInt(req.params.id), req.body);
    if (!updatedCourse) return res.status(404).json({ error: "Course not found" });

    if (updatedCourse.error) return res.status(400).json({ error: updatedCourse.error });

    res.json(updatedCourse);
};

const getCoursesSummaryHandler = (req, res) => {
    const summary = getCoursesSummary();
    if (!summary) return res.status(500).json({ error: "Could not calculate summary" });

    res.json(summary);
};

module.exports = { getCoursesHandler, getCourseByIdHandler, updateCourseHandler, getCoursesSummaryHandler };
