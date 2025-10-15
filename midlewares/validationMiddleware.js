const { body , validationResult } = require("express-validator");

exports.signupValidation = [
  //  Name validation
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 20 characters")
    .matches(/^[A-Za-z\s]+$/).withMessage("Name can only contain letters and spaces"),

  //  Registration Number
  body("registrationNumber")
    .notEmpty().withMessage("Registration number is required")
    .isLength({ min: 11, max: 12 }).withMessage("Registration number must be 6–12 characters long")
    .matches(/^[A-Za-z0-9\-]+$/).withMessage("Registration number can only contain letters, numbers, or hyphens"),

  //  WhatsApp Number
  body("watsappNumber")
    .notEmpty().withMessage("WhatsApp number is required")
    .isMobilePhone().withMessage("Invalid WhatsApp number format")
    .isLength({ min: 10, max: 13 }).withMessage("WhatsApp number must be between 10 and 13 digits"),

  //  Email
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),

  //  Password
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8, max: 15 }).withMessage("Password must be 8–20 characters long")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/).withMessage("Password must contain at least one number")
   ,

  //  Confirm Password
  body("confirmPassword")
    .notEmpty().withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("Passwords do not match");
      return true;
    }),

//   // 👩‍💼 Optional: Role
//   body("role")
//     .optional()
//     .isIn(["student", "teacher", "admin"])
//     .withMessage("Role must be one of: student, teacher, or admin"),
];

//  Handle validation results
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => err.msg),
    });
  }
  next();
};
