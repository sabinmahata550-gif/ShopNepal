import { Resend } from "resend";
import config from "../config/config.js";

const resend = new Resend(config.resendEmailApiKey);

const sendEmail = async ({ recipient, subject, html }) => {
    const response = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: recipient,
        subject,
        html
    });

    return response;
};

export default sendEmail;