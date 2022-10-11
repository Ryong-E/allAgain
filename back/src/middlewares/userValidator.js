import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const error = new Error(errors.errors[0].msg);
  return next(error);
};

exports.userRegisterValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("이메일이 없습니다.")
      .bail()
      .isEmail()
      .withMessage("이메일 형식이 아닙니다."),
    body("password")
      .notEmpty()
      .withMessage("비밀번호 입력값이 없습니다.")
      .bail()
      .isLength({ min: 8, max: 15 })
      .withMessage("비밀번호의 길이가 최소 8자, 최대 15자가 아닙니다."),
    body("passwordConfirm").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      return true;
    }),
    validate,
  ];
};

exports.userLoginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("이메일이 없습니다.")
      .bail()
      .isEmail()
      .withMessage("이메일 형식이 맞지 않습니다.")
      .bail(),
    body("password")
      .notEmpty()
      .withMessage("비밀번호가 없습니다.")
      .bail()
      .isLength({ min: 8, max: 15 })
      .withMessage("비밀번호의 길이가 양식에 맞지 않습니다."),
    validate,
  ];
};
