import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import { ApiError } from "../Utils/ApiError.js";

const sendMail = async (options) => {
  //get initialize mailgen instance
  //generate plaintext and html form mail using mailgen
  //create transporter with all mail data
  //create mail
  //send transporter mail

  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "User Module Team",
      link: "https://usermoduleTeam",
    },
  });

  const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SMTP_HOST,
    port: process.env.MAIL_SMPT_PORT,
    auth: {
      user: process.env.MAIL_SMPT_USER,
      pass: process.env.MAIL_SMPT_PASS,
    },
  });

  const mail = {
    from: process.env.MAIL_SMPT_USER,
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
         throw new ApiError(500,"Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file")
  }
};

const forgotPasswordMailgenContent = (firstName, otp)=>{

    return{
        body: {
            name: firstName,
            intro: "We got a request to reset the password of Your account",
            action:{
              // To reset your password click on the following button or link:
                instructions: "OTP for reset your password is:-",
                button: {
                    color: "#22BC66",
                    text : otp,
                    // link : otp,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        }
    }


}


export {sendMail , forgotPasswordMailgenContent}