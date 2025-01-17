const nodemailer = require("nodemailer");
require("dotenv").config();

const SENDER_EMAIL = process.env.SENDER_EMAIL;

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.USER_PASS,
        pass: process.env.PASS_PASS,
    },
});

const sendProductCreationEmail = async (productName) => {
    try {
        await transport.sendMail({
            from: SENDER_EMAIL,
            to: "heypapi@gmail.com",
            subject: "Nouveau produit créé",
            html: `<b>Un nouveau produit a été créé : ${productName}</b>`,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

module.exports = {
    sendProductCreationEmail,
};
