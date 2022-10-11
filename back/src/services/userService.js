import { User } from "../db/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const token = jwt.sign({ user_id: user[0].id }, secretKey);

    const { name, nickname, birthday, image_url } = user[0];
    const loginUser = {
      token,
      name,
      nickname,
      birthday: birthday.toString(),
      image_url,
    };

    return loginUser;
  },
  register: async ({
    email,
    password,
    name,
    nickname,
    birthday,
    image_url,
  }) => {
    password = await bcrypt.hash(password, 10);
    // 이메일 중복 체크
    const user = await User.findByEmail({ email });
    if (user.length > 0) throw new Error("이미 가입된 이메일입니다.");

    const registeredUser = await User.register({
      email,
      password,
      name,
      nickname,
      birthday,
      image_url,
    });
    return registeredUser;
  },
};

export { userService };
