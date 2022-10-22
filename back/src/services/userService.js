import { Feed, User } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { compareUserId, makeImageUrl } from "../utils/util";
import { SALT_ROUND } from "../utils/util";

const userService = {
  login: async ({ email, password }) => {
    const user = await User.findByEmail({ email });

    if (user[0].length === 0) {
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
  getUserInfo: async ({ userId, currentUserId }) => {
    const user = await User.findByUserId({ userId });
    const feeds = await Feed.findFeedByUserId({ userId });

    const followers = await User.findFollowersByUserId({ userId });
    const filteredFollowers = [];
    for (let follower of followers) {
      const { id: userId, nickname, image } = follower;
      const imageUrl = makeImageUrl("profiles", image);

      filteredFollowers.push({
        userId,
        nickname,
        imageUrl,
      });
    }

    const followees = await User.findFolloweesByUserId({ userId });
    const filteredFollowees = [];
    for (let followee of followees) {
      const { id: userId, nickname, image } = followee;
      const imageUrl = makeImageUrl("profiles", image);

      filteredFollowees.push({
        userId,
        nickname,
        imageUrl,
      });
    }

    const { name, nickname, image } = user[0];
    const imageUrl = makeImageUrl("profiles", image);
    const followed = await User.findExistenceFollowee({
      currentUserId,
      targetUserId: userId,
    });

    const targetUser = {
      name,
      nickname,
      imageUrl,
      NumberOfFeeds: feeds[0].length,
      followed: followed ? true : false,
      followers: { count: followers.length, users: filteredFollowers },
      followees: { count: followees.length, users: filteredFollowees },
    };

    return targetUser;
  },
  getUserInfoForGuest: async ({ userId }) => {
    const user = await User.findByUserId({ userId });
    const feeds = await Feed.findFeedByUserId({ userId });

    const followers = await User.findFollowersByUserId({ userId });
    const filteredFollowers = [];
    for (let follower of followers) {
      const { id: userId, nickname, image } = follower;
      const imageUrl = makeImageUrl("profiles", image);

      filteredFollowers.push({
        userId,
        nickname,
        imageUrl,
      });
    }

    const followees = await User.findFolloweesByUserId({ userId });
    const filteredFollowees = [];
    for (let followee of followees) {
      const { id: userId, nickname, image } = followee;
      const imageUrl = makeImageUrl("profiles", image);

      filteredFollowees.push({
        userId,
        nickname,
        imageUrl,
      });
    }

    const { name, nickname, image } = user[0];
    const imageUrl = makeImageUrl("profiles", image);

    const targetUser = {
      name,
      nickname,
      imageUrl,
      NumberOfFeeds: feeds[0].length,
      followed: false,
      followers: { count: followers.length, users: filteredFollowers },
      followees: { count: followees.length, users: filteredFollowees },
    };

    return targetUser;
  },
  getMyInfo: async ({ currentUserId }) => {
    const user = await User.findByUserId({ userId: currentUserId });

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
  postFollowee: async ({ currentUserId, targetUserId }) => {
    const CurrentUser = await User.findByUserId({ userId: currentUserId });
    const targetUser = await User.findByUserId({ userId: targetUserId });

    const follow = await User.findExistenceFollowee({
      currentUserId,
      targetUserId,
    });
    if (follow) {
      throw new Error("이미 팔로우 중입니다.");
    }

    await User.createFollowee({ currentUserId, targetUserId });

    return "팔로우 완료";
  },
  deleteFollowee: async ({ currentUserId, targetUserId }) => {
    const CurrentUser = await User.findByUserId({ userId: currentUserId });
    const targetUser = await User.findByUserId({ userId: targetUserId });

    const follow = await User.findExistenceFollowee({
      currentUserId,
      targetUserId,
    });
    if (!follow) {
      throw new Error("팔로우 중인 유저가 아닙니다.");
    }
    await User.deleteFollowee({ currentUserId, targetUserId });

    return "팔로우 취소 완료";
  },
};

export { userService };
