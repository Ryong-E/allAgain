import { Feed } from "../db/Feed";

const feedService = {
  createFeed: async ({ userId, category, tags, imageUrls, description }) => {
    const uploadedFeed = await Feed.createFeed(
      {
        userId,
        category,
        tags,
        imageUrls,
        description,
      },
      (error) => {
        if (error) throw error;
      }
    );
    return uploadedFeed;
  },
  getFeeds: async ({ userId }) => {
    const feedList = await Feed.getFeeds({ userId }, (error) => {
      if (error) throw error;
    });
    return feedList;
  },
};

export { feedService };
