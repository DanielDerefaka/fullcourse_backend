require("dotenv").config();

module.exports = () => {
  const emailConfig = {
    apiKey: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN,
  };
  return emailConfig;
};
