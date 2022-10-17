import { body, param, check } from "express-validator";
import { validate } from "./commonValidator";

const userRegisterValidator = () => {
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

const userLoginValidator = () => {
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

const userProfileUpdateVaildator = () => {
  return [
    param("userId").notEmpty().withMessage("userId가 없습니다."),
    body("password").custom((value, { req }) => {
      if (value !== req.body.passwordConfirm) {
        throw new Error("변경할 비밀번호가 일치하지 않습니다.");
      }
      return true;
    }),
    check().custom((value, { req }) => {
      if (
        (req.body.password || req.body.passwordConfirm) &&
        !req.body.currentPassword
      ) {
        throw new Error("현재 비밀번호를 입력해주세요.");
      }
      return true;
    }),
    validate,
  ];
};

const userProfilePostVaildator = () => {
  return [
    param("userId").notEmpty().withMessage("userId가 없습니다."),
    check().custom((value, { req }) => {
      if (!req.file?.path) {
        throw new Error("이미지파일이 없습니다.");
      }
      return true;
    }),
    validate,
  ];
};

const userDeleteValidator = () => {
  return [
    param("userId").notEmpty().withMessage("userId가 없습니다."),
    validate,
  ];
};

export {
  userRegisterValidator,
  userLoginValidator,
  userProfileUpdateVaildator,
  userProfilePostVaildator,
  userDeleteValidator,
};
