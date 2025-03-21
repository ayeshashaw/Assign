const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Ayeshashaw520@gmail.com',
        pass: 'ayesha2000'
    }
});

app.get('/sendemail', async (req, res) => {
    const mailOptions = {
        from: 'yAyeshashaw520@gmail.com',
        to: ['shawa@gmail.com', 'venugopal.burli@masaischool.com'],
        subject: 'Testing Email from NEMB43 Student',
        text: 'This is a testing Mail sent by NEMB43 student, no need to reply.'
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Failed to send email');
        console.error(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
