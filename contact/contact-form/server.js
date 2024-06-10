const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    // Configure nodemailer transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alexandruwechsler@gmail.com',
            pass: 'Bigpooh3!'
        }
    });

    let mailOptions = {
        from: email,
        to: 'alexandruwechsler@gmail.com',
        subject: 'Contact Form Submission',
        text: `You have a new message from ${firstName} ${lastName} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
})
