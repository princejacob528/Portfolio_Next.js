// components/emailTemplate.js

const getEmailTemplate = (formData) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h2 {
          color: #333;
          text-align: center;
        }
        .details {
          margin: 20px 0;
        }
        .details p {
          font-size: 16px;
          line-height: 1.5;
          color: #555;
        }
        .details span {
          font-weight: bold;
          color: #333;
        }
      </style>
      <title>Contact Form Details</title>
    </head>
    <body>
      <div class="container">
        <h2>New Contact Form Submission</h2>
        <div class="details">
          <p><span>First Name:</span> ${formData.firstname}</p>
          <p><span>Last Name:</span> ${formData.lastname}</p>
          <p><span>Email Address:</span> ${formData.email}</p>
          <p><span>Phone Number:</span> ${formData.phone}</p>
          <p><span>Selected Service:</span> ${formData.service}</p>
          <p><span>Message:</span> ${formData.message}</p>
        </div>
      </div>
    </body>
    </html>
    `;
  };
  
  export default getEmailTemplate;
  