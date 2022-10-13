// @ts-nocheck
import { connection } from "../app";

const Feed = {
  createFeed: async ({ userId, category, tags, imageUrls, description }) => {
    const feed = await connection
      .promise()
      .query(
        "INSERT INTO feeds(user_id, category, tags, image_urls, description) VALUES(?, ?, ?, ?, ?)",
        [userId, category, tags, imageUrls, description]
      );
    return "피드 업로드 성공";
  },
  getFeeds: async ({ userId }) => {
    const feedList = await connection.promise().query("SELECT * FROM feeds");
    return feedList[0].map((feed) => {
      return {
        feedId: feed.id,
        userId: feed.user_id,
        category: feed.category,
        tags: feed.tags,
        imageUrls: feed.image_urls,
        description: feed.description,
      };
    });
  },
  getFeedById: async ({ feedId }) => {
    const feed = await connection
      .promise()
      .query("SELECT * FROM feeds WHERE id = ?", feedId);
    return {
      feedId: feed[0][0].id,
      userId: feed[0][0].user_id,
      category: feed[0][0].category,
      tags: feed[0][0].tags,
      imageUrls: feed[0][0].image_urls,
      description: feed[0][0].description,
    };
  },
  updateFeed: async ({ feedId, category, tags, imageUrls, description }) => {
    const updatedFeed = await connection
      .promise()
      .query(
        "UPDATE feeds SET category = ?, tags = ?, image_urls = ?, description = ? WHERE id = ?",
        [category, tags, imageUrls, description, feedId]
      );
    return updatedFeed;
  },
  deleteFeed: async ({ feedId }) => {
    const deletedFeed = await connection
      .promise()
      .query("DELETE FROM feeds WHERE id = ?", feedId);
    return deletedFeed;
  },
};

export { Feed };
