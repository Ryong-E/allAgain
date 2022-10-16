import { User } from "../db/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const fs = require("fs");
const path = require("path");

const userService = {
  login: async ({ email, password }) => {
    const user = await User.findByEmail({ email });
    // 가입되어있지 않은 이메일 에러처리
    if (user.length === 0) {
      throw new Error("가입되어있지 않은 이메일입니다.");
    }

    // password 암호화 체크
    const correctPassword = user[0].password;
    const isPasswordCorrect = await bcrypt.compare(password, correctPassword);
    if (!isPasswordCorrect) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    // jwt토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ userId: user[0].id }, secretKey);

    const { name, nickname, image_url } = user[0];
    const loginUser = {
      token,
      name,
      nickname,
      imageUrl: image_url,
    };

    return loginUser;
  },
  register: async ({ email, password, name, nickname }) => {
    password = await bcrypt.hash(password, 10);

    // 이메일 중복 체크
    var user = await User.findByEmail({ email });
    if (user.length > 0) throw new Error("이미 가입된 이메일입니다.");

    // 닉네임 중복 체크
    user = await User.findByNickname({ nickname });
    if (user.length > 0) throw new Error("이미 존재하는 닉네임입니다.");

    const registeredUser = await User.register({
      email,
      password,
      name,
      nickname,
    });

    return registeredUser;
  },
  updateProfile: async ({ userId, currentPassword, nickname, password }) => {
    const userById = await User.findByUserId({ userId });
    if (userById.length === 0) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    if (currentPassword) {
      const correctPassword = userById[0].password;
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword ? currentPassword : "default",
        correctPassword
      );
      if (!isPasswordCorrect) {
        throw new Error("현재 비밀번호가 일치하지 않습니다.");
      }
    }

    const updatedNickname = nickname ? nickname : userById[0].nickname;
    const updatedPassword = password
      ? await bcrypt.hash(password, 10)
      : userById[0].password;

    const userByNickname = await User.findByNickname({
      nickname: updatedNickname,
    });
    if (
      userByNickname.length > 0 &&
      userById[0].nickname !== userByNickname[0].nickname
    ) {
      throw new Error("이미 존재하는 닉네임입니다.");
    }

    await User.update({
      userId,
      nickname: updatedNickname,
      password: updatedPassword,
    });
    const updatedUser = await User.findByUserId({ userId });

    const filterdUserData = {
      nickname: updatedUser[0].nickname,
    };

    return filterdUserData;
  },
  updateProfileImage: async ({ imagePath, userId }) => {
    const re = new RegExp(`profiles.*`, "g");
    const serverUrl = process.env.SERVER_URL || "localhost";
    const serverPort = process.env.SERVER_PORT || 5000;
    const imageUrl = path.join(
      serverUrl + ":" + serverPort,
      "/",
      imagePath.match(re)[0]
    );

    await User.updateImageUrl({ userId, imageUrl });

    return { imageUrl };
  },
  withdrawal: async ({ userId }) => {
    await User.delete({ userId });

    return null;
  },
  getUserInfo: async ({ nickname }) => {
    const user = await User.findByNickname({ nickname });
    if (user.length === 0) {
      throw new Error("존재하지 않는 닉네임입니다.");
    }

    const targetUser = {
      name: user[0].name,
      nickname,
      imageUrl: user[0].image_url,
    };

    return targetUser;
  },
  getMyInfo: async ({ userId }) => {
    const user = await User.findByUserId({ userId });
    if (user.length === 0) {
      throw new Error("존재하지 않는 아이디입니다.");
    }

    const userInfo = {
      email: user[0].email,
      name: user[0].name,
      nickname: user[0].nickname,
      imageUrl: user[0].image_url,
    };

    return userInfo;
  },
};

export { userService };
