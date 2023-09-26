const sgMail = require("@sendgrid/mail");

const sgMailApiKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sgMailApiKey);
module.exports.sendTemplate = (to, from, templateId, dynamic_template_data) => {
  try {
    const msg = {
      to,
      from: { name: "Capital City", email: from },
      templateId,
      dynamic_template_data,
    };
    sgMail
      .send(msg)
      .then((response) => {})
      .catch((error) => {
        throw new Error("User already exists with same email");
      });
  } catch (error) {
    console.log("empty");
  }
};
