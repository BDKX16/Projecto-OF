const jwt = require("jsonwebtoken");

let checkAuth = (req, res, next) => {
  let token = req.get("token");

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "error",
        error: err,
      });
    }

    req.userData = decoded.userData;

    next();
  });
};

let checkRole = (role) => {
  return (req, res, next) => {
    if (req.userData.role !== role) {
      return res.status(401).json({
        status: "error",
        error: "Unauthorized",
      });
    }

    next();
  };
};

module.exports = { checkAuth, checkRole };
