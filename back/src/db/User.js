import { connection } from "../app";

const User = {
  findByEmail: async ({ email }) => {
    const user = await connection
      .promise()
      .query("SELECT * FROM users WHERE email = ?", email, (error) => {
        if (error) throw error;
      });

    return user[0];
  },
  findByNickname: async ({ nickname }) => {
    const user = await connection
      .promise()
      .query("SELECT * FROM users WHERE nickname = ?", nickname, (error) => {
        if (error) throw error;
      });

    return user[0];
  },
  register: async ({
    email,
    password,
    name,
    nickname,
    birthday,
    image_url,
  }) => {
    await connection
      .promise()
      .query(
        "INSERT INTO users(email, password, name, nickname, birthday, image_url) VALUES(?, ?, ?, ?, ?, ?)",
        [email, password, name, nickname, birthday, image_url],
        (error) => {
          if (error) throw error;
        }
      );
    return "회원가입 성공";
  },
};

export { User };
