const fs = require("fs");

export const getAllCourses = ()=>{

    try {
        const data = fs.readFileSync("./db.json","utf-8");
        return JSON.parse(data)
    } catch (error) {
        console.error("Error reading db.json:", error);
        return null;
    }
}