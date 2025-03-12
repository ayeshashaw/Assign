const express = require('express');
const Booking = require('../models/booking');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/bookings', authenticate, async (req, res) => {
    const { destination, date } = req.body;
    const booking = new Booking({ destination, date, userId: req.user._id });
    await booking.save();
    res.status(201).json(booking);
});

router.get('/bookings', authenticate, authorize('admin'), async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
});


router.put('/bookings/:id', authenticate, async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
});


router.delete('/bookings/:id', authenticate, async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted successfully' });
});

module.exports = router;
