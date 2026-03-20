const otpStore = {};

function generateOTP(email) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  setTimeout(() => {
    delete otpStore[email]; // expire in 5 min
  }, 300000);

  return otp;
}

function verifyOTP(email, otp) {
  return otpStore[email] == otp;
}

module.exports = { generateOTP, verifyOTP };
