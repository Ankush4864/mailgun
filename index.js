const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const api_key = '1c0a4316f7ddb94b52e63e034b58f456-ee16bf1a-93f459b6'; 
const domain = 'sandboxb8917199012f4ccb829ddb477d67f896.mailgun.org'; 
const mailgunInstance = mailgun({ apiKey: api_key, domain: domain });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const email = req.body.email;

    const mailData = {
        from: 'Ankush <ankush4864.be22@chitkara.edu.in>',
        to: email,
        subject: 'Hii, I am Ankush',
        text: 'Testing',
    };

    mailgunInstance.messages().send(mailData, function (error, body) {
        if (error) {
            console.log(error);
            return res.status(500).send("Error");
        } else {
            console.log(body);
            res.sendFile(__dirname + '/index.html');
        }
    });
});


app.listen(8000, () => {
    console.log("The Server is running");
});