import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { feedService } from "../services/feedService";

const feedRouter = Router();

feedRouter.post("/", loginRequired, async (req, res, next) => {
  try {
    const { category, tags, imageUrls, description } = req.body;
    const createdFeed = await feedService.createFeed({
      // @ts-ignore
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

feedRouter.get("/", loginRequired, async (req, res, next) => {
  try {
    const feedList = await feedService.getFeeds({
      // @ts-ignore
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
    const feed = await feedService.getFeedById({
      feedId,
    });
    res.status(200).send(feed);
  } catch (error) {
    next(error);
  }
  try {
    const feedList = await feedService.getFeeds({
      // @ts-ignore
      userId: req.currentUserId,
    });
    res.status(200).send(feedList);
  } catch (error) {
    next(error);
  }
});

feedRouter.delete("/:feedId", loginRequired, async (req, res, next) => {});

feedRouter.put("/", loginRequired, async (req, res, next) => {});

// feedRouter.post("/likes", loginRequired, (req, res, next) => {});

// feedRouter.delete("/likes", loginRequired, (req, res, next) => {});

export { feedRouter };
