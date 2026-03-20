const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'atultiwari23519@gmail.com',
    pass: 'ghym carh qmvj bwyj'
  }
});

async function sendOTP(email, otp) {
  await transporter.sendMail({
    from: 'YOUR_GMAIL@gmail.com',
    to: email,
    subject: 'Your OTP Verification',
    html: `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes</p>`
  });
  console.log(`OTP sent to ${email}: ${otp}`);
}

module.exports = sendOTP;
