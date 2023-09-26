const { check, validationResult } = require("express-validator");

const Router = require("express").Router();

const { sendEmail } = require("../../mailgun/email-util");
Router.post(
  "/test",
  check("recipient").notEmpty().withMessage("must not be empty"),
  check("text").notEmpty().withMessage("must not be empty"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        error: errors.array(),
      });
    }

    const { recipient, text } = req.body;
    try {
      await sendEmail(recipient, {
        subject: "test mail",
        text: text,
      });
      res.json({ text: "Your query has been sent" });
      await next();
    } catch (e) {
      await next(e);
    }
  }
);

module.exports = Router;
