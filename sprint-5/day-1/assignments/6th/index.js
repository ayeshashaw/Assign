const {EventEmmiter} = require("Events");

const greet = new EventEmmiter();

greet.on("click",()=>{
  console.log("Hello! Welcome to Event-Driven Programming in Node.js")
})