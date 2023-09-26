const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization");

  // Check if not token

  if (!token) {
    return res.status(401).json({
      errors: [
        {
          msg: "Illegal Operation, You dont have adequate privilege to carry out this operation",
        },
      ],
    });
  }

  //VERIFY THE TOKEN TO KNOW IF IT'S VALID
  try {
    const decoded = jwt.verify(token, process.env.SECRET_ADMIN);
    req.admin = decoded.admin;
    next();
  } catch (error) {
    res.status(401).json({
      errors: [
        {
          msg: "INVALID TOKEN, CONTACT SUPPORT",
        },
      ],
    });
  }
};
