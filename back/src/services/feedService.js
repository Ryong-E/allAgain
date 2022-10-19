import { Feed } from "../db/model/Feed";
const path = require("path");
import { imageService } from "./imageService";
import { Image } from "../db/model/Image";
import { User } from "../db/model/User";
import { makeImageUrl } from "../utils/util";

// httpMethod

const feedService = {
  postFeed: async ({
    userId,
    category,
    tags,
    imageUrls,
    description,
    datetime,
  }) => {
    const uploadedFeed = await Feed.createFeed({
      userId,
      category,
      tags,
      imageUrls,
      description,
      datetime,
    });
    return uploadedFeed;
  },
  getAllFeeds: async () => {
    const feedData = await Feed.findAllFeeds();
    const feedList = [];
    for (const item of feedData[0]) {
      const feedId = item.id;
      const imageUrls = await imageService.getImageUrls({ feedId });
      const likeList = await feedService.getLikes({ feedId });
      const author = await User.findByUserId({ userId: item.user_id });
      const { image, nickname } = author[0];
      const authorImageUrl = makeImageUrl("profiles", String(image));
      const feed = {
        feedId,
        userId: item.user_id,
        category: item.category,
        tags: item.tags,
        imageUrls: imageUrls,
        description: item.description,
        datetime: item.datetime,
        likes: likeList,
        authorImageUrl,
        nickname,
      };
      feedList.push(feed);
    }
    return feedList;
  },
  getFeedByFeedId: async ({ feedId }) => {
    const feedData = await Feed.findFeedByFeedId({ feedId });
    const {
      user_id: userId,
      category,
      tags,
      description,
      datetime,
    } = feedData[0];
    const imageUrls = await imageService.getImageUrls({ feedId });
    const likeList = await feedService.getLikes({ feedId });
    const author = await User.findByUserId({ userId });
    const { image, nickname } = author[0];
    const authorImageUrl = makeImageUrl("profiles", String(image));

    const comments = await Feed.findAllCommentsByFeedId({ feedId });
    const filteredComments = [];

    for (let comment of comments) {
      const {
        comment_id: commentId,
        user_id: commentUserId,
        content: commentContent,
        root_comment_id: rootCommentId,
        timestamp,
        nickname: commentUserNickname,
        image: commentUserImage,
      } = comment;

      const commentUserImageUrl = makeImageUrl("profiles", commentUserImage);
      filteredComments.push({
        commentId,
        content: commentContent,
        rootCommentId,
        timestamp,
        writer: {
          userId: commentUserId,
          nickname: commentUserNickname,
          image: commentUserImageUrl,
        },
      });
    }

    const feed = {
      feedId,
      userId,
      imageUrls,
      category,
      tags,
      description,
      datetime,
      likes: likeList,
      authorImageUrl,
      nickname,
      comments: filteredComments,
    };
    return feed;
  },
  getFeedByUserId: async ({ userId }) => {
    const feedData = await Feed.findFeedByUserId({ userId });
    const feedList = [];
    for (const item of feedData[0]) {
      const feedId = item.id;
      const imageUrls = await imageService.getImageUrls({ feedId });
      const likeList = await feedService.getLikes({ feedId });
      const author = await User.findByUserId({ userId: item.user_id });
      const { image, nickname } = author[0];
      const authorImageUrl = makeImageUrl("profiles", String(image));
      const feed = {
        feedId,
        userId: item.user_id,
        category: item.category,
        tags: item.tags,
        imageUrls: imageUrls,
        description: item.description,
        datetime: item.datetime,
        likes: likeList,
        authorImageUrl,
        nickname,
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
      throw new Error("존재하지 않는 피드입니다.");
    }
    const { user_id: userId } = feedData[0];
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
    const feedData = await Feed.findFeedByFeedId({ feedId });
    const { user_id: userId } = feedData[0];
    if (userId !== currentUserId) {
      throw new Error("삭제 권한이 없습니다.");
    }
    const deletedFeed = await Feed.deleteFeed({ feedId });
    return deletedFeed;
  },
  postLike: async ({ feedId, userId }) => {
    const likeId = await Feed.createLike({ feedId, userId });
    return likeId;
  },
  deleteLike: async ({ currentUserId, likeId }) => {
    const likeData = await Feed.findLikeByLikeId({ likeId });
    const { user_id: userId } = likeData[0][0];
    if (userId !== currentUserId) {
      throw new Error("삭제 권한이 없습니다.");
    }
    const deletedLike = await Feed.deleteLike({ likeId });
    return deletedLike;
  },
  getLikes: async ({ feedId }) => {
    const likeData = await Feed.findAllLikesByFeedId({ feedId });
    const likeList = [];
    for (const like of likeData[0]) {
      likeList.push({ likeId: like["id"], userId: like["user_id"] });
    }
    return likeList;
  },
  postComment: async ({ currentUserId, feedId, content, rootCommentId }) => {
    const user = await User.findByUserId({ userId: currentUserId });

    const feed = await Feed.findFeedByFeedId({ feedId });

    if (rootCommentId) {
      const comment = await Feed.findCommentByCommentId({
        commentId: rootCommentId,
      });
    }

    await Feed.createComment({
      feedId,
      userId: currentUserId,
      content,
      rootCommentId: rootCommentId || undefined,
    });

    return "댓글 생성 완료";
  },
  updateComment: async ({ commentId, content, currentUserId }) => {
    const comment = await Feed.findCommentByCommentId({ commentId });
    if (comment[0].user_id !== currentUserId) {
      throw new Error("수정 권한이 없습니다.");
    }

    await Feed.updateComment({ commentId, content });

    return "댓글 수정 완료";
  },
  deleteComment: async ({ currentUserId, commentId }) => {
    const comment = await Feed.findCommentByCommentId({ commentId });

    if (comment[0].user_id !== currentUserId) {
      throw new Error("삭제 권한이 없습니다.");
    }

    await Feed.deleteComment({ commentId });

    return "댓글 삭제 완료";
  },
};

export { feedService };
