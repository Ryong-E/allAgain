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
  saveImageUrls: async ({ imagePaths }) => {
    const imageUrls = [];
    for (const imagePath of imagePaths) {
      const re = new RegExp(`feeds.*`, "g");
      const serverUrl = process.env.SERVER_URL || "localhost";
      const serverPort = process.env.SERVER_PORT || 5001;
      const imageUrl = path.join(
        serverUrl + ":" + serverPort,
        "/",
        imagePath["path"].match(re)[0]
      );
      const imageId = await Feed.saveImageUrl({
        name: imagePath.name,
        url: imageUrl,
      });
      imageUrls.push({ id: imageId, name: imagePath.name, url: imageUrl });
    }

    return imageUrls;
  },
  getFeeds: async () => {
    const feedList = await Feed.getFeeds();
    return feedList;
  },
  getFeedById: async ({ feedId }) => {
    const feed = await Feed.getFeedById({ feedId });
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
