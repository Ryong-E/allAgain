// @ts-nocheck
import { connection } from "../app";

const Feed = {
  createFeed: async ({ userId, category, tags, imageUrls, description }) => {
    const insertFeed = await connection
      .promise()
      .query(
        "INSERT INTO feeds(user_id, category, tags, description) VALUES(?, ?, ?, ?)",
        [userId, category, tags, description]
      );
    const feed = await connection.promise().query("SELECT LAST_INSERT_ID()");
    const feedId = feed[0][0]["LAST_INSERT_ID()"];
    for (const imageUrl of imageUrls) {
      const imageId = imageUrl["id"];
      await connection
        .promise()
        .query("INSERT INTO feeds_images(feed_id, image_id) VALUES(?,?)", [
          feedId,
          imageId,
        ]);
    }
    return "피드 업로드 성공";
  },
  saveImageUrl: async ({ name, url }) => {
    await connection
      .promise()
      .query("INSERT INTO images(name, url) VALUES(?, ?)", [name, url]);
    const imageId = await connection.promise().query("SELECT LAST_INSERT_ID()");
    return imageId[0][0]["LAST_INSERT_ID()"];
  },
  getFeeds: async ({ userId }) => {
    const feedList = await connection.promise().query("SELECT * FROM feeds");
    return feedList[0].map((feed) => {
      return {
        feedId: feed.id,
        userId: feed.user_id,
        category: feed.category,
        tags: feed.tags,
        description: feed.description,
      };
    });
  },
  getFeedById: async ({ feedId }) => {
    const feed = await connection
      .promise()
      .query("SELECT * FROM feeds WHERE id = ?", feedId);
    const imageUrls = await connection
      .promise()
      .query(
        "SELECT images.id, images.url FROM feeds_images JOIN images WHERE feeds_images.image_id = images.id and feeds_images.feed_id = ?",
        feedId
      );
    return {
      feedId,
      userId: feed[0][0].user_id,
      imageUrls: imageUrls[0],
      category: feed[0][0].category,
      tags: feed[0][0].tags,
      description: feed[0][0].description,
    };
  },
  updateFeed: async ({ feedId, category, tags, imageUrls, description }) => {
    const updatedFeed = await connection
      .promise()
      .query(
        "UPDATE feeds SET category = ?, tags = ?, description = ? WHERE id = ?",
        [category, tags, description, feedId]
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
