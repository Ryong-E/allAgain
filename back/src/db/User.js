import { promisePool } from "../app";

const User = {
  findByEmail: async ({ email }) => {
    try {
      const user = await promisePool.query(
        "SELECT * FROM users WHERE email = ?",
        email
      );

      return user[0];
    } catch (error) {
      throw error;
    }
  },
  findByNickname: async ({ nickname }) => {
    try {
      const user = await promisePool.query(
        "SELECT * FROM users WHERE nickname = ? and nickname is not null",
        nickname
      );

      return user[0];
    } catch (error) {
      throw error;
    }
  },
  findByUserId: async ({ userId }) => {
    try {
      const user = await promisePool.query(
        "SELECT * FROM users WHERE id = ?",
        userId
      );

      return user[0];
    } catch (error) {
      throw error;
    }
  },
  register: async ({ email, password, name, nickname }) => {
    try {
      await promisePool.query(
        "INSERT INTO users(email, password, name, nickname) VALUES(?, ?, ?, ?)",
        [email, password, name, nickname]
      );

      return null;
    } catch (error) {
      throw error;
    }
  },
  update: async ({ userId, nickname, password }) => {
    try {
      await promisePool.query(
        "UPDATE users SET nickname = ?, password = ? WHERE id=?",
        [nickname, password, userId]
      );

      return null;
    } catch (error) {
      throw error;
    }
  },
  updateImage: async ({ userId, imageUrl }) => {
    try {
      await promisePool.query("UPDATE users SET image = ? WHERE id = ?", [
        imageUrl,
        userId,
      ]);

      return null;
    } catch (error) {
      throw error;
    }
  },
  delete: async ({ userId }) => {
    try {
      await promisePool.query("DELETE FROM users WHERE id = ?", userId);

      return null;
    } catch (error) {
      throw error;
    }
  },
};

export { User };
