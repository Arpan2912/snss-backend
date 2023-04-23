const nodemailer = require('nodemailer');

const sentMail = async () => {
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sanyam@snssindia.in', // generated ethereal user
      pass: 'Cnss@2021', // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: 'sanyam@snssindia.in', // sender address
    to: "shaharpan05@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("info", info);
}

module.exports = {
  sentMail
}