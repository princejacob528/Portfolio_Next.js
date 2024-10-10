// app/api/sendEmail/route.js

import nodemailer from 'nodemailer';
import getEmailTemplate from '../../../components/emailTemplate'; // Adjust the path if necessary

export async function POST(request) {
  const formData = await request.json();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: {
      user: "YourMailId@gmail.com",
      pass: "YourPasskey",
    },
  });

  const htmlContent = getEmailTemplate(formData);

  const mailOptions = {
    from: "YourMailId@gmail.com",
      to: "RecipientMailID@gmail.com",
      subject: "New Message from YourDomainName",
      html: htmlContent,
      category: "Message"
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
    });
  }
}
