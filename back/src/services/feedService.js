import { Feed } from "../db/Feed";

const feedService = {
  createFeed: async ({ userId, category, tags, imageUrls, description }) => {
    const uploadedFeed = await Feed.createFeed({
      userId,
      category,
      tags,
      imageUrls,
      description,
    });
    return uploadedFeed;
  },
  getFeeds: async ({ userId }) => {
    const feedList = await Feed.getFeeds({ userId });
    return feedList;
  },
  getFeedById: async ({ feedId }) => {
    const feed = await Feed.getFeedById({ feedId });
    return feed;
  },
};

export { feedService };
