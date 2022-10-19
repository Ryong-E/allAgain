import { promisePool } from "..";

// crud -> r: find
// 전체 조회시 -> All
// findFeedByUserIdAndFeedId

const Feed = {
  createFeed: async ({
    userId,
    category,
    tags,
    imageUrls,
    description,
    datetime,
  }) => {
    const connection = await promisePool.getConnection(async (conn) => conn);
    let feedId = "";
    try {
      await connection.beginTransaction();
      await connection.query(
        "INSERT INTO feeds(user_id, category, tags, description, datetime) VALUES(?, ?, ?, ?, ?)",
        [userId, category, tags, description, datetime]
      );
      const insertedfeedIds = await connection.query(
        "SELECT id FROM feeds WHERE user_id = ? and category = ? and tags = ? and description = ? and datetime = ? ORDER BY id desc",
        [userId, category, tags, description, datetime]
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
    const connection = await promisePool.getConnection(async (conn) => conn);
    try {
      await connection.beginTransaction();
      await connection.query(
        "UPDATE feeds SET category = ?, tags = ?, description = ? WHERE id = ?",
        [category, tags, description, feedId]
      );
      await connection.query(
        "DELETE FROM feeds_images WHERE feed_id = ?",
        feedId
      );
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
      return "업데이트 완료";
    }
  },
  deleteFeed: async ({ feedId }) => {
    try {
      await promisePool.query("DELETE FROM feeds WHERE id = ?", feedId);
      return "피드 삭제 완료";
    } catch (error) {
      throw error;
    }
  },
  createLike: async ({ feedId, userId }) => {
    try {
      await promisePool.query(
        "INSERT INTO feed_likes(feed_id, user_id) VALUES(?, ?)",
        [feedId, userId]
      );
      return "좋아요 완료";
    } catch (error) {
      throw error;
    }
  },
  findAllLikesByFeedId: async ({ feedId }) => {
    try {
      const likeList = await promisePool.query(
        "SELECT id, user_id FROM feed_likes WHERE feed_id = ?",
        feedId
      );
      return likeList;
    } catch (error) {
      throw error;
    }
  },
  findLikeByLikeId: async ({ likeId }) => {
    try {
      const like = await promisePool.query(
        "SELECT * FROM feed_likes WHERE id = ?",
        likeId
      );
      return like;
    } catch (error) {
      throw error;
    }
  },
  deleteLike: async ({ likeId }) => {
    try {
      await promisePool.query("DELETE FROM feed_likes WHERE id = ?", likeId);
      return "좋아요 취소 완료";
    } catch (error) {
      throw error;
    }
  },
  createComment: async ({ feedId, userId, content, rootCommentId }) => {
    try {
      await promisePool.query(
        "INSERT INTO feed_comments(feed_id, user_id, content, root_comment_id) VALUES(?,?,?,?)",
        [feedId, userId, content, rootCommentId]
      );

      return null;
    } catch (error) {
      throw error;
    }
  },
  findCommentByCommentId: async ({ commentId }) => {
    try {
      const comment = await promisePool.query(
        "SELECT * FROM feed_comments WHERE id = ?",
        [commentId]
      );

      if (comment[0].length === 0) {
        throw new Error("존재하지 않는 댓글입니다.");
      }

      return comment[0];
    } catch (error) {
      throw error;
    }
  },
  findAllCommentsByFeedId: async ({ feedId }) => {
    try {
      const comments = await promisePool.query(
        "SELECT *, feed_comments.id as comment_id FROM feed_comments JOIN users ON feed_comments.user_id = users.id WHERE feed_comments.feed_id = ?",
        [feedId]
      );

      return comments[0];
    } catch (error) {
      throw error;
    }
  },
  deleteComment: async ({ commentId }) => {
    try {
      await promisePool.query(
        "DELETE FROM feed_comments WHERE id = ?",
        commentId
      );
      return null;
    } catch (error) {
      throw error;
    }
  },
  updateComment: async ({ commentId, content }) => {
    try {
      await promisePool.query(
        "UPDATE feed_comments SET content = ? WHERE id = ?",
        [content, commentId]
      );

      return null;
    } catch (error) {
      throw error;
    }
  },
};

export { Feed };
