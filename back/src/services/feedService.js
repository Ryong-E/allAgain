import { Feed } from '../db/model/Feed';
const path = require('path');
import { imageService } from './imageService';
import { Image } from '../db/model/Image';
import { User } from '../db/model/User';
import { makeImageUrl } from '../utils/util';

// httpMethod

const feedService = {
  postFeed: async ({ userId, category, tags, imageUrls, description }) => {
    const uploadedFeed = await Feed.createFeed({
      userId,
      category,
      tags,
      imageUrls,
      description,
    });
    return uploadedFeed;
  },
  getAllFeeds: async () => {
    const feedData = await Feed.findAllFeeds();
    const feedList = [];
    for (const item of feedData[0]) {
      const feedId = item.id;
      const author = await User.findByUserId({ userId: String(item.user_id) });
      const { image, nickname } = author[0];
      const authorImageUrl = makeImageUrl('profiles', String(image));
      const imageUrls = await imageService.getImageUrls({ feedId });
      const feed = {
        feedId,
        userId: item.user_id,
        category: item.category,
        tags: item.tags,
        imageUrls: imageUrls,
        description: item.description,
        authorImageUrl: authorImageUrl,
        nickname: nickname,
      };
      feedList.push(feed);
    }
    return feedList;
  },
  getFeedByFeedId: async ({ feedId }) => {
    const feedData = await Feed.findFeedByFeedId({ feedId });
    const { user_id: userId, category, tags, description } = feedData[0];
    const author = await User.findByUserId({ userId: String(userId) });
    const { image, nickname } = author[0];
    const authorImageUrl = makeImageUrl('profiles', String(image));
    const imageUrls = await imageService.getImageUrls({ feedId });
    const feed = {
      feedId,
      userId,
      imageUrls,
      category,
      tags,
      description,
      authorImageUrl,
      nickname,
    };
    return feed;
  },
  getFeedByUserId: async ({ userId }) => {
    const feedData = await Feed.findFeedByUserId({ userId });
    const feedList = [];
    for (const item of feedData[0]) {
      const feedId = item.id;
      const imageUrls = await imageService.getImageUrls({ feedId });
      const feed = {
        feedId,
        userId: item.user_id,
        category: item.category,
        tags: item.tags,
        imageUrls: imageUrls,
        description: item.description,
      };
      feedList.push(feed);
    }
    return feedList;
  },
  updateFeed: async ({
    currentUserId,
    feedId,
    category,
    tags,
    imageUrls,
    description,
  }) => {
    const feedData = await Feed.findFeedByFeedId({ feedId });
    if (feedData.length === 0) {
      throw new Error('존재하지 않는 피드입니다.');
    }
    const { user_id: userId } = feedData[0];
    if (userId !== currentUserId) {
      throw new Error('수정 권한이 없습니다.');
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
    const feedData = await Feed.findFeedByFeedId({ feedId });
    const { user_id: userId } = feedData[0];
    if (userId !== currentUserId) {
      throw new Error('삭제 권한이 없습니다.');
    }
    const deletedFeed = await Feed.deleteFeed({ feedId });
    return deletedFeed;
  },
};

export { feedService };
