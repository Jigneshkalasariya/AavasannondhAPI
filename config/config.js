require('dotenv').config();

module.exports = {
    HOST: process.env.DATABASE_HOST,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    DB: process.env.DATABASE_DB,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
    SUPPORT_EMAIL_FROM: process.env.SUPPORT_EMAIL_FROM,
    ADMIN_MAILID: process.env.ADMIN_MAILID,
    UI_URL: process.env.UI_URL,
    CONTACT_FORM_TARGET: process.env.CONTACT_FORM_TARGET
}