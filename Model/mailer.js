/** this script is not currently in use,
 * however, we may use it in the future */

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "akaglue2020@gmail.com",
    pass: "CHUKWUamaka2020!!",
  },
});

var mailOptions = {
  from: "akaglue2020@gmail.com",
  to: "karenfahey@rocketmail.com",
  subject: "Sending Email using Node.js",
  text: "Hi Karen, Trying out the nodemailer application! Amaka",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
