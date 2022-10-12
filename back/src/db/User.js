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
      .query(
        "SELECT * FROM users WHERE nickname = ? and nickname is not null",
        nickname,
        (error) => {
          if (error) throw error;
        }
      );

    return user[0];
  },
  findByUserId: async ({ userId }) => {
    const user = await connection
      .promise()
      .query("SELECT * FROM users WHERE id = ?", userId, (error) => {
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
  update: async ({ userId, name, nickname, birthday }) => {
    await connection
      .promise()
      .query(
        "UPDATE users SET name=?, nickname=?, birthday=? WHERE id=?",
        [name, nickname, birthday, userId],
        (error) => {
          if (error) throw error;
        }
      );

    return null;
  },
  updateImageUrl: async ({ userId, image_url }) => {
    await connection
      .promise()
      .query(
        "UPDATE users SET image_url = ? WHERE id = ?",
        [image_url, userId],
        (error) => {
          if (error) throw error;
        }
      );

    return null;
  },
};

export { User };
