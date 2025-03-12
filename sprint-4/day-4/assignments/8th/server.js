const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const setupSwagger = require('./swagger/swaggerConfig');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(authRoutes);
app.use(bookingRoutes);

setupSwagger(app);

mongoose.connect('mongodb://localhost:27017/travel-booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server  running ${PORT}`);
});
