const express = require("express");
const fs = require("fs");

const app = express();

app.get("/",(req,res)=>{
    const readFile = fs.readFileSync("db.json",{encoding:"utf-8"});
    res.send(readFile);
    console.log(readFile);
})

app.use(express.json());
app.post("/courses",(req,res)=>{
    const newCourse = req.body;
    const newFile = fs.readFileSync("db.json",{encoding:"utf-8"});
    const newFileData = JSON.parse(newFile);
    newFileData.push(newCourse);
    const newData = JSON.stringify(newFileData);
    fs.writeFileSync("db.json",newData);
    res.send(newFileData);
})


app.listen(3000,()=>{
    console.log("server is running on port 3000");
})

