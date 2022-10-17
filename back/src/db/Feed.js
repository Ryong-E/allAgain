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
  getImages: async ({ feedId }) => {
    const imageUrls = connection
      .promise()
      .query(
        "SELECT images.id, images.name, images.url FROM feeds_images JOIN images WHERE feeds_images.image_id = images.id and feeds_images.feed_id = ?",
        feedId
      );
    return imageUrls;
  },
  getFeeds: async () => {
    const getFeedList = await connection.promise().query("SELECT * FROM feeds");
    const feedList = [];
    for (const item of getFeedList[0]) {
      const feedId = item.id;
      const imageUrls = await Feed.getImages({ feedId });
      const feed = {
        feedId,
        userId: item.user_id,
        category: item.category,
        tags: item.tags,
        imageUrls: imageUrls[0],
        description: item.description,
      };
      feedList.push(feed);
    }
    return feedList;
  },
  getFeedById: async ({ feedId }) => {
    const feed = await connection
      .promise()
      .query("SELECT * FROM feeds WHERE id = ?", feedId);
    const imageUrls = await Feed.getImages({ feedId });
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
    await connection
      .promise()
      .query("DELETE FROM feeds_images WHERE feed_id = ?", feedId);
    for (const imageUrl of imageUrls) {
      const imageId = imageUrl["id"];
      await connection
        .promise()
        .query("INSERT INTO feeds_images(feed_id, image_id) VALUES(?,?)", [
          feedId,
          imageId,
        ]);
    }
    return updatedFeed;
  },
  deleteFeed: async ({ feedId }) => {
    const imageIds = await connection
      .promise()
      .query(
        "SELECT DISTINCT image_id FROM feeds_images WHERE feed_id = ?",
        feedId
      );
    await connection
      .promise()
      .query("DELETE FROM feeds_images WHERE feed_id = ?", feedId);
    for (const imageId of imageIds) {
      if (!imageId[0].image_id) break;
      await connection
        .promise()
        .query("DELETE FROM images WHERE id = ?", imageId[0].image_id);
    }
    const deletedFeed = await connection
      .promise()
      .query("DELETE FROM feeds WHERE id = ?", feedId);
    return deletedFeed;
  },
};

export { Feed };
