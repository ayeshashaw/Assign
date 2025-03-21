const {EventEmmiter} = require("Events");

const myEvents = new EventEmmiter();

myEvents.on("userRegistered",(username,email)=>{
    console.log(`User ${username} has been successfully registered with email ${email}!`)
})

setTimeout(()=>{
    myEvents.emit("send-confirmation-email",email);
},2000);

myEvents.on("send-confirmation-email",(email)=>{
    console.log(`Confirmation email sent to ${email}`);

})

myEvents.emit("userRegistered", "JohnDoe", "johndoe@example.com")