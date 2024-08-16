const auth = (req, res, next) => {
  // console.log(req.session.userEmail);
  if (req.session.userEmail) {
    next();
  } else {
    res.json({ message: "User is logged out." });
  }
};

module.exports = auth;
