import { createTransport } from 'nodemailer'
import secrets from '@/utils/secrets';

export async function sendMailAsVerfiy({
    to, 
    subject = "Verify your request",
    template,
    from = "WalkinCity - Requests"
}: {
    to: string,
    template: string, 
    subject?: string,
    from?: string,
}) {
    const transporter = createTransport({
        host: secrets.SMTP_HOSTNAME,
        port: secrets.SMTP_PORT,
        secure: secrets.SMTP_TLS,
        auth: {
            user: secrets.SMTP_VERIFY_USER,
            pass: secrets.SMTP_VERIFY_PASSWORD,
        },
    });

    const mailOptions = {
        from: `${from} ${secrets.SMTP_VERIFY_USER}`,
        to,
        subject,
        html: template
    }

    const mail = await transporter.sendMail(mailOptions);

    console.log(`[${mail.messageId}] Request message sent to: ${to}`)
}

export async function sendMailAsAdmin({
    to, 
    subject = "Setup your account",
    template,
    from = "WalkinCity - Admin"
}: {
    to: string,
    template: string, 
    subject?: string,
    from?: string,
}) {
    const transporter = createTransport({
        host: secrets.SMTP_HOSTNAME,
        port: secrets.SMTP_PORT,
        secure: secrets.SMTP_TLS,
        auth: {
            user: secrets.SMTP_ADMIN_USER,
            pass: secrets.SMTP_ADMIN_PASSWORD,
        },
    });

    const mailOptions = {
        from: `${from} ${secrets.SMTP_ADMIN_USER}`,
        to,
        subject,
        html: template
    }

    const mail = await transporter.sendMail(mailOptions);

    console.log(`[${mail.messageId}] Request message sent to: ${to}`)
}
