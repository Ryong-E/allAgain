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
      .isLength({ min: 6 })
      .withMessage("비밀번호의 길이가 최소 8자, 최대 15자가 아닙니다."),
    body("passwordConfirm")
      .notEmpty()
      .withMessage("비밀번호확인 입력값이 없습니다.")
      .bail()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }
        return true;
      }),
    body("name").notEmpty().withMessage("이름 입력값이 없습니다."),
    body("nickname").notEmpty().withMessage("닉네임 입력값이 없습니다."),
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
      .isLength({ min: 6 })
      .withMessage("비밀번호의 길이가 양식에 맞지 않습니다."),
    validate,
  ];
};

exports.userProfileUpdateVaildator = () => {
  return [
    body("password").custom((value, { req }) => {
      if (value !== req.body.passwordConfirm) {
        throw new Error("변경할 비밀번호가 일치하지 않습니다.");
      }
      return true;
    }),
    validate,
  ];
};
