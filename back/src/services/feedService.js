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
    console.log(feed);
    return feed;
  },
  updateFeed: async ({
    userId,
    currentUserId,
    feedId,
    category,
    tags,
    imageUrls,
    description,
  }) => {
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
    const feed = await Feed.getFeedById({ feedId });
    if (feed.userId !== currentUserId) {
      throw new Error("삭제 권한이 없습니다.");
    }
    const deletedFeed = await Feed.deleteFeed({ feedId });
    return deletedFeed;
  },
};

export { feedService };
