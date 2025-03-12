const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    try {
        const readFile = fs.readFileSync("db.json", { encoding: "utf-8" });
        const data = JSON.parse(readFile); 
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error reading data" });
    }
});

app.post("/courses", (req, res) => {
    try {
        const newCourse = req.body;
        const newFile = fs.readFileSync("db.json", { encoding: "utf-8" });
        const newFileData = JSON.parse(newFile);

        newFileData.push(newCourse);
        
        fs.writeFileSync("db.json", JSON.stringify(newFileData, null, 2));
        
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ error: "Error adding course" });
    }
});

app.put("/courses/:id", (req, res) => {
    try {
        const updateCourse = JSON.parse(fs.readFileSync("db.json", { encoding: "utf-8" }));
        const id = parseInt(req.params.id);

        const index = updateCourse.findIndex((item) => item.id === id);

        if (index !== -1) {
            updateCourse[index] = { ...updateCourse[index], ...req.body };
            fs.writeFileSync("db.json", JSON.stringify(updateCourse, null, 2));
            res.json(updateCourse[index]);
        } else {
            res.status(404).json({ error: "ID not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error updating course" });
    }
});

app.delete("/courses/:id", (req, res) => {
    try {
        const deleteCourse = JSON.parse(fs.readFileSync("db.json", { encoding: "utf-8" }));
        const id = parseInt(req.params.id);

        const index = deleteCourse.findIndex((item) => item.id === id);

        if (index !== -1) {
            deleteCourse.splice(index, 1);
            fs.writeFileSync("db.json", JSON.stringify(deleteCourse, null, 2));
            res.json(deleteCourse);
        } else {
            res.status(404).json({ error: "ID not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting course" });
    }
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
