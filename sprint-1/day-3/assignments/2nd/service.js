const express = require("express");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
app.use("/courses", courseRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
