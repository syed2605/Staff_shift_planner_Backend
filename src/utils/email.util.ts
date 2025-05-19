import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: { 
        user: process.env.EMAIL_USER || "67ccc5b2c4cbf1",
        pass: process.env.EMAIL_PASS || "72d38babf985b9",
    },
});

export async function sendEmail(to: string, subject: string, html: string) {
    console.log(to,subject,html,process.env.EMAIL_USER,process.env.EMAIL_PASS,transporter,"sdsdsd");
    const info = await transporter.sendMail({ 
        from: `HealthCare < ${ process.env.EMAIL_USER! } >`,
        to,
        subject,
        html,
    });
    console.log('Email sent:', info.messageId); 
}