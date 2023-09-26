const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("access-token");

  // Check if not token

  if (!token) {
    return res.status(401).json({
      errors: [
        {
          msg: "Illegal !!, Provide token",
        },
      ],
    });
  }

  //VERIFY THE TOKEN TO KNOW IF IT'S VALID
  try {
    console.log(token, "from website");
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({
      errors: [
        {
          msg: "INVALID TOKEN, CONTACT SUPPORT",
        },z
      ],
    });
  }
};
