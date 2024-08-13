const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

app.get('/', (req, res) => {
    res.send('Welcome to the Contact Form Backend');
});

app.post('/send', (req, res) => {
    console.log(req.body); // Log the incoming request body
    const { name, email, message } = req.body;
    
    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: `Contact submission from ${name}`,
        text: `Name: ${name} \nEmail: ${email} \nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); // Log the error
            return res.status(500).send('Failed to send message (server).');
        }
        res.status(200).send('Message sent successfully!');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
