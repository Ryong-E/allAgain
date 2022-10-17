import { Feed } from "../db/Feed";
const path = require("path");

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
  getFeeds: async () => {
    const feedList = await Feed.getFeeds();
    return feedList;
  },
  getFeedByFeedId: async ({ feedId }) => {
    const feed = await Feed.getFeedByFeedId({ feedId });
    return feed;
  },
  updateFeed: async ({
    currentUserId,
    feedId,
    category,
    tags,
    imageUrls,
    description,
  }) => {
    const feed = await Feed.getFeedByFeedId({ feedId });
    const userId = feed.userId;
    if (userId !== currentUserId) {
      throw new Error("수정 권한이 없습니다.");
    }
    const updatedFeed = await Feed.updateFeed({
      feedId,
      category,
      tags,
      imageUrls,
      description,
    });
    return updatedFeed;
  },
  deleteFeed: async ({ currentUserId, feedId }) => {
    const feed = await Feed.getFeedByFeedId({ feedId });
    if (feed.userId !== currentUserId) {
      throw new Error("삭제 권한이 없습니다.");
    }
    const deletedFeed = await Feed.deleteFeed({ feedId });
    return deletedFeed;
  },
};

export { feedService };
