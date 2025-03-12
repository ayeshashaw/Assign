const express = require("express");
const { getCoursesData, getCourseById } = require("../controllers/courseController");

const router = express.Router();

router.get("/",getCoursesData);
router.get("/:id",getCourseById)

module.exports = router;