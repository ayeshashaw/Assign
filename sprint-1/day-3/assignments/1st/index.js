const express = require("express");
const courseRouter = require("./routers/courseRouter")


const app = express();

app.use("/courses",courseRouter)

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});