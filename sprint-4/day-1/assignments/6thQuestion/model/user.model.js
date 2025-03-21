const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Store as plain text (for now)
});

module.exports = mongoose.model("User", userSchema);
