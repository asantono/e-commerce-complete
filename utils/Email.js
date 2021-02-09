const nodemailer = require("nodemailer");
const { htmlToText } = require("html-to-text");

exports.email = async (email, url, type = "passwordRecovery") => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SENDGRID_SERVER,
      port:
        process.env.NODE_ENV === "development"
          ? process.env.SENDGRID_PORT
          : process.env.SENDGRID_SSL_PORT,
      secure: process.env.NODE_ENV === "development" ? false : true, // true for 465, false for other ports
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_KEY,
      },
    });

    let subject, html;

    switch (type) {
      case "passwordRecovery":
        subject = "Password Reset";
        html = `<div>
        You have requested a password reset.
      </div><p>Please follow this link to reset your password: <a href=${url} /></p><div>
      -Anthony "Papa" Santo
     </div>`;
        break;
      case "welcome":
        subject = "Welcome to the E-commerce Site";
        html = `<div>Welcome to my e-commerce project</div>
        <div>
        <p>You can view courses, create your own course, and even purchase courses with Stripe approved test Credit Cards found here: <a href="https://stripe.com/docs/testing" target="_blank" rel="noopener" /></p>
        </div>
        <div>You can code this website along with me in my free youtube series found here: <a href="https://youtube.com/playlist?list=PL_kocBMOO_TxyQvK_u2AaCEwo4A59TTtN" target="_blank" rel="noopener" /></div>
        <div>&nbsp;</div>
        <div>Sincerely,</div>
        <div>Anthony "Papa" Santo</div>
        <div>Email: EmailPapaSanto@gmail.com</div>`;

      default:
        break;
    }

    await transporter.sendMail({
      from: '"Papa Santo" <emailpapasanto@gmail.com>',
      to: email,
      subject,
      text: htmlToText(html, {
        wordwrap: false,
        tags: {
          a: {
            options: {
              noLinkBrackets: true,
              noAnchorUrl: true,
            },
          },
        },
      }),
    });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
