import { body, validationResult, param } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const error = new Error(errors.errors[0].msg);
  return next(error);
};

exports.campaignCreateValidator = () => {
  return [
    body("title").notEmpty().withMessage("제목이 없습니다."),
    body("content").notEmpty().withMessage("내용이 없습니다."),
    body("recruitmentStartDate")
      .notEmpty()
      .withMessage("모집 시작 날짜가 없습니다.")
      .bail()
      .isISO8601()
      .toDate()
      .withMessage("모집 시작 날짜가 ISO DATE가 아닙니다."),
    body("recruitmentEndDate")
      .notEmpty()
      .withMessage("모집 마감 날짜가 없습니다.")
      .bail()
      .isISO8601()
      .toDate()
      .withMessage("모집 마감 날짜가 ISO DATE가 아닙니다.")
      .custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.recruitmentStartDate)) {
          throw new Error("모집 기간이 유효하지 않습니다.");
        }
        return true;
      }),
    body("campaignStartDate")
      .notEmpty()
      .withMessage("캠페인 시작 날짜가 없습니다.")
      .bail()
      .isISO8601()
      .toDate()
      .withMessage("캠페인 시작 날짜가 ISO DATE가 아닙니다."),
    body("campaignEndDate")
      .notEmpty()
      .withMessage("캠페인 마감 날짜가 없습니다.")
      .bail()
      .isISO8601()
      .toDate()
      .withMessage("캠페인 마감 날짜가 ISO DATE가 아닙니다.")
      .custom((value, { req }) => {
        if (value <= req.body.campaignStartDate) {
          throw new Error("캠페인 기간이 유효하지 않습니다.");
        }
        if (req.body.campaignStartDate < req.body.recruitmentEndDate) {
          throw new Error("캠페인 시작 날짜와 모집 마감 날짜를 확인하세요.");
        }
        return true;
      }),
    body("introduce").notEmpty().withMessage("소개글이 없습니다."),
    validate,
  ];
};
