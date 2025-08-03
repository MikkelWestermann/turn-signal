import { render } from '@react-email/components';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST!,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: parseInt(process.env.EMAIL_PORT || '587') === 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASSWORD!,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

// TODO: Type
export const renderEmail = async (Email: any, props: any) => {
  const html = await render(<Email {...props} />);
  const text = await render(<Email {...props} />, { plainText: true });
  return { html, text };
};

export const sendEmail = async (
  email: string,
  subject: string,
  html: string,
  text: string,
) => {
  const options = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject,
    html,
    text,
  };

  await transporter.sendMail(options);
};
