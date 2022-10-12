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

      res.status(201).json(register);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post("/login", userLoginValidator(), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginUser = await userService.login({ email, password });

    res.status(201).json(loginUser);
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

userRouter.delete("/", loginRequired, async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    await userService.withdrawalUser({ userId: currentUserId });

    res.status(204).json("ok");
  } catch (error) {
    next(error);
  }
});

// userRouter.get("/:userId", async function (req, res, next) {
//   const { userId } = req.params;
//   // userId에 해당하는 유저 조회
//   // userId에 해당하는 유저정보 응답
//   // userId가 있을 때와 없을 때 경우를 나눠서 처리
//   // 1. userId가 없을 경우 -> validator에서 걸림 -> 404 error
//   // 2. userId가 있는 경우 -> DB 조회 -> userId가 DB에 등록되어 있지 않을 경우 -> 400 error
// });

export { userRouter };
