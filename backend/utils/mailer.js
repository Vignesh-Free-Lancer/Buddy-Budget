// Import Node-Mailer For Send Confirmation Link To User Mail
const nodeMailer = require("nodemailer");

const sendConfirmationEmail = (
  emailType,
  userEmail,
  userName,
  userEmailToken
) => {
  return new Promise((resolve, reject) => {
    // Generate Mail Configuration
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send Verification Mail Content Creator
    const mailOptions = {
      from: '"Verify Your Mail" <developer.vicky@gmail.com>',
      to: userEmail.toLowerCase(),
      subject: `Buddy-Budget - ${
        emailType === "new-user"
          ? "Verify Your Email"
          : "Resent Verification Link"
      } `,
      html: `<h2>Hi ${userName},</h2>
          <h3>Thanks for registering on our site.</h3>
          <h4>Pleaser verify your email to access your account.</h4>
          <p><a href="http://${
            process.env.NODE_ENV === "development"
              ? process.env.DOMAIN
              : "localhost:3000"
          }/user/email-account/activate/${userEmailToken}">Click here - To activate your Email</a></p>
          <P style="margin-top:30px;">Regards,</p>
          <p>Support Team</p>`,
    };

    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

module.exports = sendConfirmationEmail;
