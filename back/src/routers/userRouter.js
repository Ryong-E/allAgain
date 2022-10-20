import { Router } from "express";
import { userService } from "../services/userService";
import {
  userRegisterValidator,
  userLoginValidator,
  userProfileUpdateVaildator,
  userProfilePostVaildator,
  userDeleteValidator,
} from "../middlewares/userValidator";
import { loginRequired } from "../middlewares/loginRequired";
import { uploadStrategy } from "../middlewares/imageUploadMiddleware";

const userRouter = Router();

userRouter.post("/", userRegisterValidator(), async (req, res, next) => {
  try {
    const { email, password, name, nickname } = req.body;
    // DB에 저장
    const register = await userService.postUser({
      email,
      password,
      name,
      nickname,
    });

    res.status(201).json(register);
  } catch (error) {
    next(error);
  }
});

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
  "/:userId",
  loginRequired,
  userProfileUpdateVaildator(),
  async (req, res, next) => {
    try {
      const { currentUserId } = req;
      const { nickname, currentPassword, password } = req.body;
      const { userId } = req.params;

      const updatedUser = await userService.updateProfile({
        userId,
        currentUserId,
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
  "/:userId/profile/image",
  loginRequired,
  uploadStrategy("profiles").single("image"),
  userProfilePostVaildator(),
  async function (req, res, next) {
    try {
      const { filename } = req.file;
      const { currentUserId } = req;
      const { userId } = req.params;

      const updatedUser = await userService.updateProfileImage({
        filename,
        currentUserId,
        userId,
      });

      res.status(201).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  "/:userId",
  loginRequired,
  userDeleteValidator(),
  async (req, res, next) => {
    try {
      const { currentUserId } = req;
      const { userId } = req.params;

      await userService.deleteUser({ userId, currentUserId });

      res.status(204).json("ok");
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get("/me", loginRequired, async (req, res, next) => {
  try {
    const { currentUserId } = req;
    const userInfo = await userService.getMyInfo({ currentUserId });

    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:userId", loginRequired, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { currentUserId } = req;
    const targetUser = await userService.getUserInfo({ userId, currentUserId });

    res.status(200).json(targetUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:userId/guest", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const targetUser = await userService.getUserInfoForGuest({ userId });

    res.status(200).json(targetUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/:userId/follow", loginRequired, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { currentUserId } = req;

    const createdfollow = await userService.postFollowee({
      currentUserId,
      targetUserId: userId,
    });

    res.status(201).json(createdfollow);
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:userId/follow", loginRequired, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { currentUserId } = req;

    const deletedfollow = await userService.deleteFollowee({
      currentUserId,
      targetUserId: userId,
    });

    res.status(204).json(deletedfollow);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
