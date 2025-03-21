import { getAllCourses } from "../../models/courseModels";

export const getCoursesData =(req,res)=>{
    const {available} = req.query;
    const data = getAllCourses();

    if (!data || !data.courses) {
        return res.status(500).json({ error: "Courses data not found" });
    }

    const course = data.course;

    if(available !== undefined){
        const isAvailable = available === true;
        course = course.filter((courses)=> courses.available === isAvailable)
    }
    res.json(course)
}


export const getCourseById = (req, res) => {
    const data = getCoursesData();

    if (!data || !data.courses) {
        return res.status(500).json({ error: "Courses data not found" });
    }

    const courseId = parseInt(req.params.id);
    const course = data.courses.find(course => course.id === courseId);

    if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
};

