const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const Email = require('../models/email');
let email_address;
let email_password;

if(process.env.NODE_ENV === 'production') {
    email_address = process.env.EMAIL_ADDRESS;
    email_password = process.env.EMAIL_PASSWORD;
} else {
    email_address = require('../../env')['EMAIL_ADDRESS'];
    email_password = require('../../env')['EMAIL_PASSWORD']
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email_address,
        pass: email_password
    },
    tls: {
        rejectUnauthorized: false
    }
});

const mailOptions = {
    from: 'uniche.inquiries@gmail.com',
    to: 'uniche.contractors@gmail.com',
    subject: 'Feedback Submission from Website',
};

router.post('/', (req, res) => {
    let message = `From: ${req.body.name}\n\nEmail Address: ${req.body.email}\n\nMessage:\n${req.body.message}`;
    
    mailOptions.text = message;

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            const dbEmail = new Email({
                name: req.body.name,
                email_address: req.body.email,
                message: req.body.message,
                error: err
            });

            dbEmail.save()
                .then(email => {
                   res.json({success: false, savedInDB: true});
                })
                .catch(err => {
                    res.json({success: false, dbError: err});
                });
        } else {
            mailOptions.text = undefined;
            res.json({success: true});
        }
    });
});

module.exports = router;