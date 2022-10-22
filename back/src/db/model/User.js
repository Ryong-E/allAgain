import { promisePool } from "..";

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

      if (user[0].length === 0) {
        throw new Error("존재하지 않는 유저입니다.");
      }

      return user[0];
    } catch (error) {
      throw error;
    }
  },
  create: async ({ email, password, name, nickname }) => {
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
  updateImage: async ({ userId, image }) => {
    try {
      await promisePool.query("UPDATE users SET image = ? WHERE id = ?", [
        image,
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
  createFollowee: async ({ currentUserId, targetUserId }) => {
    try {
      await promisePool.query(
        "INSERT INTO follows(follower, followee) VALUES (?, ?)",
        [currentUserId, targetUserId]
      );

      return null;
    } catch (error) {
      throw error;
    }
  },
  deleteFollowee: async ({ currentUserId, targetUserId }) => {
    try {
      await promisePool.query(
        "DELETE FROM follows WHERE follower = ? AND followee = ?",
        [currentUserId, targetUserId]
      );

      return null;
    } catch (error) {
      throw error;
    }
  },
  findExistenceFollowee: async ({ currentUserId, targetUserId }) => {
    try {
      const existence = await promisePool.query(
        "SELECT EXISTS (SELECT * FROM follows WHERE follower = ? AND followee = ?) as existence",
        [currentUserId, targetUserId]
      );

      return existence[0][0].existence;
    } catch (error) {
      throw error;
    }
  },
  findFolloweesByUserId: async ({ userId }) => {
    try {
      const followees = await promisePool.query(
        "SELECT * FROM follows JOIN users ON follows.followee = users.id WHERE follows.follower = ?",
        [userId]
      );

      return followees[0];
    } catch (error) {
      throw error;
    }
  },
  findFollowersByUserId: async ({ userId }) => {
    try {
      const followers = await promisePool.query(
        "SELECT * FROM follows JOIN users ON follows.follower = users.id WHERE follows.followee = ?",
        [userId]
      );

      return followers[0];
    } catch (error) {
      throw error;
    }
  },
};

export { User };
