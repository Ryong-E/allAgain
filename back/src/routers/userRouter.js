import { Router } from "express";
import { userService } from "../services/userService";
import {
  userRegisterValidator,
  userLoginValidator,
  userProfileUpdateVaildator,
  getUserValidator,
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
    await userService.withdrawal({ userId: currentUserId });

    res.status(204).json("ok");
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  "/informations/others/:nickname",
  loginRequired,
  getUserValidator(),
  async (req, res, next) => {
    try {
      const { nickname } = req.params;
      const targetUser = await userService.getUserInfo({ nickname });

      res.status(200).json(targetUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get("/informations/me", loginRequired, async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    const userInfo = await userService.getMyInfo({ userId: currentUserId });

    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
