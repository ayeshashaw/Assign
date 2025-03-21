const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("LMS Application Middleware Setup Complete!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port 3000`);
});
