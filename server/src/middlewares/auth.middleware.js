const auth = (req, res, next) => {
  if (req.session.userEmail) {
    next();
  } else {
    res.json({ message: "User is logged out." });
  }
};

module.exports = auth;
