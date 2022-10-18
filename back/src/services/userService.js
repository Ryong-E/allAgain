import { User } from "../db/model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { compareUserId, makeImageUrl } from "../utils/util";
import { SALT_ROUND } from "../utils/util";

const userService = {
  login: async ({ email, password }) => {
    const user = await User.findByEmail({ email });
    // 가입되어있지 않은 이메일 에러처리
    if (user.length === 0) {
      throw new Error("가입되어있지 않은 이메일입니다.");
    }

    const {
      id: userId,
      password: correctPassword,
      name,
      nickname,
      image,
    } = user[0];

    // password 암호화 체크
    const isPasswordCorrect = await bcrypt.compare(password, correctPassword);
    if (!isPasswordCorrect) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    // jwt토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ userId }, secretKey);

    const imageUrl = makeImageUrl("profiles", image);
    const loginUser = {
      userId,
      token,
      name,
      nickname,
      imageUrl,
    };

    return loginUser;
  },
  postUser: async ({ email, password, name, nickname }) => {
    password = await bcrypt.hash(password, SALT_ROUND);

    // 이메일 중복 체크
    let user = await User.findByEmail({ email });
    if (user.length > 0) {
      throw new Error("이미 가입된 이메일입니다.");
    }

    // 닉네임 중복 체크
    user = await User.findByNickname({ nickname });
    if (user.length > 0) {
      throw new Error("이미 존재하는 닉네임입니다.");
    }

    await User.create({
      email,
      password,
      name,
      nickname,
    });

    return "회원가입 성공";
  },
  updateProfile: async ({
    userId,
    currentUserId,
    currentPassword,
    nickname,
    password,
  }) => {
    compareUserId(userId, currentUserId);

    const user = await User.findByUserId({ userId });
    if (user.length === 0) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    const { password: correctPassword, nickname: currentNickname } = user[0];

    if (currentPassword) {
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        correctPassword
      );
      if (!isPasswordCorrect) {
        throw new Error("현재 비밀번호가 일치하지 않습니다.");
      }
    }

    const updatedNickname = nickname || currentNickname;
    const updatedPassword = password
      ? await bcrypt.hash(password, SALT_ROUND)
      : correctPassword;

    const userByNickname = await User.findByNickname({
      nickname: updatedNickname,
    });
    if (
      userByNickname.length > 0 &&
      currentNickname !== userByNickname[0].nickname
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
  updateProfileImage: async ({ filename, userId, currentUserId }) => {
    compareUserId(userId, currentUserId);

    await User.updateImage({ userId, image: filename });
    const imageUrl = makeImageUrl("profiles", filename);

    return { imageUrl };
  },
  deleteUser: async ({ userId, currentUserId }) => {
    compareUserId(userId, currentUserId);

    await User.delete({ userId });

    return null;
  },
  getUserInfo: async ({ userId }) => {
    const user = await User.findByUserId({ userId });
    if (user.length === 0) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    const { name, nickname, image } = user[0];
    const imageUrl = makeImageUrl("profiles", image);

    const targetUser = {
      name,
      nickname,
      imageUrl,
    };

    return targetUser;
  },
  getMyInfo: async ({ currentUserId }) => {
    const user = await User.findByUserId({ userId: currentUserId });
    if (user.length === 0) {
      throw new Error("존재하지 않는 아이디입니다.");
    }

    const { email, name, nickname, image } = user[0];
    const imageUrl = makeImageUrl("profiles", image);

    const userInfo = {
      email,
      name,
      nickname,
      imageUrl,
    };

    return userInfo;
  },
};

export { userService };
