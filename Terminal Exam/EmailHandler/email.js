// import { SMTPClient } from 'emailjs';
const email = require("emailjs")
require("dotenv").config();
sendEmail=(text,from,to,subject,attachment)=>{
    const client = new email.SMTPClient({
        user: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD,
        host: 'smtp.gmail.com',
        ssl: true,
    });
    
    client.send(
        {
            text,
            from,
            to,
            // cc,
            subject,
            attachment
        },
        (err, message) => {
            console.log(err || message);
        }
    )
}

module.exports = sendEmail