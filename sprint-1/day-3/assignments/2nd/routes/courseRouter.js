const express = require("express");
const { getCoursesHandler, getCourseByIdHandler, updateCourseHandler, getCoursesSummaryHandler } = require("../controllers/courseController");

const router = express.Router();

router.get("/", getCoursesHandler);
router.get("/:id", getCourseByIdHandler);
router.put("/:id", express.json(), updateCourseHandler);
router.get("/summary", getCoursesSummaryHandler);

module.exports = router;
