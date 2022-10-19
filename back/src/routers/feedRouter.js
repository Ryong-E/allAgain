// @ts-nocheck
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { feedService } from "../services/feedService";

const feedRouter = Router();

feedRouter.post("/", loginRequired, async (req, res, next) => {
  try {
    const { category, tags, imageUrls, description, datetime } = req.body;
    const createdFeed = await feedService.postFeed({
      userId: req.currentUserId,
      category,
      tags,
      imageUrls,
      description,
      datetime,
    });
    res.status(201).send(createdFeed.toString());
  } catch (error) {
    next(error);
  }
});

feedRouter.get("/", async (req, res, next) => {
  try {
    const feedList = await feedService.getAllFeeds();
    res.status(200).send(feedList);
  } catch (error) {
    next(error);
  }
});

feedRouter.get("/:feedId", async (req, res, next) => {
  try {
    const { feedId } = req.params;
    const feed = await feedService.getFeedByFeedId({ feedId });
    res.status(200).send(feed);
  } catch (error) {
    next(error);
  }
});

feedRouter.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const feeds = await feedService.getFeedByUserId({ userId });
    res.status(200).send(feeds);
  } catch (error) {
    next(error);
  }
});

feedRouter.put("/:feedId", loginRequired, async (req, res, next) => {
  try {
    const { feedId } = req.params;
    const { category, tags, imageUrls, description } = req.body;
    const currentUserId = req.currentUserId;

    const updatedFeed = await feedService.updateFeed({
      currentUserId,
      feedId,
      category,
      tags,
      imageUrls,
      description,
    });
    res.status(201).send(updatedFeed);
  } catch (error) {
    next(error);
  }
});

feedRouter.delete("/:feedId", loginRequired, async (req, res, next) => {
  try {
    const { feedId } = req.params;
    const currentUserId = req.currentUserId;
    const deletedFeed = await feedService.deleteFeed({ currentUserId, feedId });
    res.status(204).send(deletedFeed);
  } catch (error) {
    next(error);
  }
});

feedRouter.post("/likes", loginRequired, async (req, res, next) => {
  try {
    const { feedId, userId } = req.body;
    const likeId = await feedService.postLike({
      feedId,
      userId,
    });
    res.status(201).send(likeId.toString());
  } catch (error) {
    next(error);
  }
});

feedRouter.delete("/likes/:likeId", loginRequired, async (req, res, next) => {
  try {
    const { likeId } = req.params;
    const currentUserId = req.currentUserId;
    const deleted = await feedService.deleteLike({ currentUserId, likeId });
    res.status(204).send(deleted);
  } catch (error) {
    next(error);
  }
});

feedRouter.post("/feed/comments", loginRequired, async (req, res, next) => {
  try {
    const { currentUserId } = req;
    const { feedId, content, rootCommentId } = req.body;

    const createdComment = await feedService.postComment({
      currentUserId,
      feedId,
      content,
      rootCommentId,
    });

    res.status(201).json(createdComment);
  } catch (error) {
    next(error);
  }
});

feedRouter.put("/feed/:commentId", loginRequired, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const { currentUserId } = req;
    const updatedComment = await feedService.updateComment({
      commentId,
      content,
      currentUserId,
    });

    res.status(201).json(updatedComment);
  } catch (error) {
    next(error);
  }
});

feedRouter.delete("/feed/:commentId", loginRequired, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { currentUserId } = req;

    const deletedComment = await feedService.deleteComment({
      currentUserId,
      commentId,
    });

    res.status(204).send(deletedComment);
  } catch (error) {
    next(error);
  }
});

export { feedRouter };
