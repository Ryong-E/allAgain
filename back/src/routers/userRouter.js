import { Router } from "express";
import { userService } from "../services/userService";
import {
  userRegisterValidator,
  userLoginValidator,
  userProfileUpdateVaildator,
} from "../middlewares/userValidator";
import { loginRequired } from "../middlewares/loginRequired";
import { uploadStrategy } from "../middlewares/imageUploadMiddleware";

const userRouter = Router();

userRouter.post(
  "/register",
  userRegisterValidator(),
  async (req, res, next) => {
    try {
      const { email, password, name, nickname } = req.body;
      // DB에 저장
      const register = await userService.register({
        email,
        password,
        name,
        nickname,
      });
      // 로그인 페이지로 이동
      res.status(200).send(register);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post("/login", userLoginValidator(), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginUser = await userService.login({ email, password });

    res.status(200).json(loginUser);
  } catch (error) {
    next(error);
  }
});

userRouter.put(
  "/profile",
  loginRequired,
  userProfileUpdateVaildator(),
  async (req, res, next) => {
    try {
      const currentUserId = req.currentUserId;
      const { nickname, currentPassword, password } = req.body;

      const updatedUser = await userService.updateProfile({
        userId: currentUserId,
        currentPassword,
        password,
        nickname,
      });

      res.status(201).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  "/profile/image",
  loginRequired,
  uploadStrategy("profiles").single("image"),
  async function (req, res, next) {
    try {
      const { path } = req.file;
      const currentUserId = req.currentUserId;

      const updatedUser = await userService.updateProfileImage({
        imagePath: path,
        userId: currentUserId,
      });

      res.status(201).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

// userRouter.delete("/", async function (req, res, next) {
//   // 회원 탈퇴
// });
// userRouter.put("/profile", async function (req, res, next) {
//   // 비밀번호, 닉네임 수정
// });

// userRouter.get("/:userId", async function (req, res, next) {
//   const { userId } = req.params;
//   // userId에 해당하는 유저 조회
//   // userId에 해당하는 유저정보 응답
//   // userId가 있을 때와 없을 때 경우를 나눠서 처리
//   // 1. userId가 없을 경우 -> validator에서 걸림 -> 404 error
//   // 2. userId가 있는 경우 -> DB 조회 -> userId가 DB에 등록되어 있지 않을 경우 -> 400 error
// });
// userRouter.get("/followers/:userId", async function (req, res, next) {
//   // userId의 팔로워 조회
//   const { userId } = req.params;
//   // 서비스 함수 사용
//   // follow 테이블
// });
// userRouter.get("/followings/:userId", async function (req, res, next) {});

export { userRouter };
