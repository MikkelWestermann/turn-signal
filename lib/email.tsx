import React from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  email: string,
  subject: string,
  EmailComponent: React.ComponentType<any>,
  props: any,
) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || 'Turn Signal <noreply@turn-signal.co>',
    to: [email],
    subject,
    react: React.createElement(EmailComponent, props),
  });

  if (error) {
    console.log('🚀 ~ sendEmail ~ error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
};
