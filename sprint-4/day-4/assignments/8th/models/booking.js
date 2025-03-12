const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    date: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
