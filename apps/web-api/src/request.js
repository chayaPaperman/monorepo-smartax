const request = require("request");
const nodemailer = require("nodemailer");

module.exports = {

sendMail: (x) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tzipi974@gmail.com",
        pass: process.env.PASSWORD,
      },
    });
    let mailOptions = {
      from: "tzipi974@gmail.com",
      to: x.email,
      subject: `${x.pass}` + `- is your Home code`,
      html: `<h2>Log in to Your Home</h2><br></br><h4>Welcome back! Enter this code within the next 10 minutes to log in : <strong>${x.pass}</strong></h4><br></br><img src='.http://localhost:3001/uploads/home.jpg' width={'40%'}></img>`, //
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
}