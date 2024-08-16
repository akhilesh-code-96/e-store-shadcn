const { body, validationResult } = require("express-validator");

const validateRequest = async (req, res, next) => {
  // console.log(req.body);
  // 1. Setup rules for validation.
  const rules = [
    body("email").isEmail().withMessage("Email is required"),
    body("issue").notEmpty().withMessage("Issue is required"),
  ];

  // 2. run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. check if there are any errors after running the rules.
  var validationErrors = validationResult(req);

  // 4. if errros, return the error message
  if (!validationErrors.isEmpty()) {
    return res.json({
      errorMessage: validationErrors.array()[0].msg,
    });
  }
  next();
};

module.exports = validateRequest;
