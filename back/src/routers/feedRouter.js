// @ts-nocheck
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { feedService } from "../services/feedService";
import { uploadStrategy } from "../middlewares/imageUploadMiddleware";

const feedRouter = Router();

feedRouter.post("/", loginRequired, async (req, res, next) => {
  try {
    const { category, tags, imageUrls, description } = req.body;
    const createdFeed = await feedService.createFeed({
      userId: req.currentUserId,
      category,
      tags,
      imageUrls,
      description,
    });
    res.status(200).send(createdFeed);
  } catch (error) {
    next(error);
  }
});

feedRouter.post(
  "/images",
  loginRequired,
  uploadStrategy("feeds").array("image"),
  async (req, res, next) => {
    const imagePaths = [];
    req.files.forEach((file) => {
      imagePaths.push({ name: file.fieldname, path: file.path });
    });
    try {
      const savedImageUrls = await feedService.saveImageUrls({ imagePaths });
      res.status(200).send(savedImageUrls);
    } catch (error) {
      next(error);
    }
  }
);

feedRouter.get("/", loginRequired, async (req, res, next) => {
  try {
    const feedList = await feedService.getFeeds({
      userId: req.currentUserId,
    });
    res.status(200).send(feedList);
  } catch (error) {
    next(error);
  }
});

feedRouter.get("/:feedId", loginRequired, async (req, res, next) => {
  try {
    const { feedId } = req.params;
    const feed = await feedService.getFeedById({ feedId });
    res.status(200).send(feed);
  } catch (error) {
    next(error);
  }
});

feedRouter.put("/", loginRequired, async (req, res, next) => {
  try {
    const { feedId, userId, category, tags, imageUrls, description } = req.body;
    const currentUserId = req.currentUserId;

    const updatedFeed = await feedService.updateFeed({
      userId,
      currentUserId,
      feedId,
      category,
      tags,
      imageUrls,
      description,
    });
    res.status(200).send(updatedFeed);
  } catch (error) {
    next(error);
  }
});

feedRouter.delete("/:feedId", loginRequired, async (req, res, next) => {
  try {
    const { feedId } = req.params;
    const currentUserId = req.currentUserId;
    const deletedFeed = await feedService.deleteFeed({ currentUserId, feedId });
    res.status(200).send(deletedFeed);
  } catch (error) {
    next(error);
  }
});

// feedRouter.post("/likes", loginRequired, (req, res, next) => {});

// feedRouter.delete("/likes", loginRequired, (req, res, next) => {});

export { feedRouter };
