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
  register: async ({ email, password, name, nickname }) => {
    await connection
      .promise()
      .query(
        "INSERT INTO users(email, password, name, nickname) VALUES(?, ?, ?, ?)",
        [email, password, name, nickname],
        (error) => {
          if (error) throw error;
        }
      );
    return null;
  },
  update: async ({ userId, nickname, password }) => {
    await connection
      .promise()
      .query(
        "UPDATE users SET nickname = ?, password = ? WHERE id=?",
        [nickname, password, userId],
        (error) => {
          if (error) throw error;
        }
      );

    return null;
  },
  updateImage: async ({ userId, imageUrl }) => {
    await connection
      .promise()
      .query(
        "UPDATE users SET image = ? WHERE id = ?",
        [imageUrl, userId],
        (error) => {
          if (error) throw error;
        }
      );

    return null;
  },
  delete: async ({ userId }) => {
    await connection
      .promise()
      .query("DELETE FROM users WHERE id = ?", userId, (error) => {
        if (error) throw error;
      });

    return null;
  },
};

export { User };
