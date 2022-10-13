import { connection } from "../app";

const Feed = {
  createFeed: async ({ userId, category, tags, imageUrls, description }) => {
    const feed = await connection
      .promise()
      .query(
        "INSERT INTO feeds(user_id, category, tags, image_urls, description) VALUES(?, ?, ?, ?, ?)",
        [userId, category, tags, imageUrls, description],
        (error) => {
          if (error) throw error;
        }
      );
    return "피드 업로드 성공";
  },
  getFeeds: async ({ userId }) => {
    const feedList = await connection.promise().query("SELECT * FROM feeds");
    return feedList[0];
  },
};

export { Feed };
