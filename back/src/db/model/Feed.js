import { promisePool } from "..";

// crud -> r: find
// 전체 조회시 -> All
// findFeedByUserIdAndFeedId

const Feed = {
  createFeed: async ({ userId, category, tags, imageUrls, description }) => {
    const connection = await promisePool.getConnection(async (conn) => conn);
    let feedId = "";
    try {
      await connection.beginTransaction();
      await connection.query(
        "INSERT INTO feeds(user_id, category, tags, description) VALUES(?, ?, ?, ?)",
        [userId, category, tags, description]
      );
      const insertedfeedIds = await connection.query(
        "SELECT id FROM feeds WHERE user_id = ? and category = ? and tags = ? and description = ? ORDER BY id desc",
        [userId, category, tags, description]
      );
      feedId = insertedfeedIds[0][0]["id"];
      for (const imageUrl of imageUrls) {
        const imageId = imageUrl["id"];
        await connection.query(
          "INSERT INTO feeds_images(feed_id, image_id) VALUES(?,?)",
          [feedId, imageId]
        );
      }
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    } finally {
      connection.release();
      return feedId;
    }
  },
  findAllFeeds: async () => {
    try {
      const feeds = await promisePool.query(
        "SELECT * FROM feeds ORDER BY id desc"
      );
      return feeds;
    } catch (error) {
      throw error;
    }
  },
  findFeedByFeedId: async ({ feedId }) => {
    try {
      const feed = await promisePool.query(
        "SELECT * FROM feeds WHERE id = ?",
        feedId
      );
      return feed[0];
    } catch (error) {
      throw error;
    }
  },
  findFeedByUserId: async ({ userId }) => {
    try {
      const feeds = await promisePool.query(
        "SELECT * FROM feeds WHERE user_id = ? ORDER BY id desc",
        userId
      );
      return feeds;
    } catch (error) {
      throw error;
    }
  },
  updateFeed: async ({ feedId, category, tags, imageUrls, description }) => {
    try {
      await promisePool.query(
        "UPDATE feeds SET category = ?, tags = ?, description = ? WHERE id = ?",
        [category, tags, description, feedId]
      );
      return "업데이트 완료";
    } catch (error) {
      throw error;
    }
    // const connection = await promisePool.getConnection(async (conn) => conn);
    // try {
    //   await connection.beginTransaction();
    //   await connection.query(
    //     "UPDATE feeds SET category = ?, tags = ?, description = ? WHERE id = ?",
    //     [category, tags, description, feedId]
    //   );
    //   await connection.query(
    //     "DELETE FROM feeds_images WHERE feed_id = ?",
    //     feedId
    //   );
    //   for (const imageUrl of imageUrls) {
    //     const imageId = imageUrl["id"];
    //     await connection.query(
    //       "INSERT INTO feeds_images(feed_id, image_id) VALUES(?,?)",
    //       [feedId, imageId]
    //     );
    //   }
    // } catch (error) {
    //   await connection.rollback();
    //   connection.release();
    //   throw error;
    // } finally {
    //   connection.release();
    //   return "업데이트 완료";
    // }
  },
  deleteFeed: async ({ feedId }) => {
    try {
      await promisePool.query("DELETE FROM feeds WHERE id = ?", feedId);
      return "피드 삭제 완료";
    } catch (error) {
      throw error;
    }
  },
};

export { Feed };
