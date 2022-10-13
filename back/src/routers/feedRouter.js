import { Router } from "express";
import { login_required } from "../middlewares/loginRequired";
import { feedService } from "../services/feedService";

const feedRouter = Router();

feedRouter.post("/", login_required, async (req, res, next) => {
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

feedRouter.get("/", login_required, async (req, res, next) => {
  try {
    const feedList = await feedService.getFeeds({
      userId: req.currentUserId,
    });
    res.status(200).send(feedList);
  } catch (error) {
    next(error);
  }
});

feedRouter.get("/:feedId", login_required, async (req, res, next) => {});

feedRouter.delete("/:feedId", login_required, async (req, res, next) => {});

feedRouter.put("/", login_required, async (req, res, next) => {});

// feedRouter.post("/likes", login_required, (req, res, next) => {});

// feedRouter.delete("/likes", login_required, (req, res, next) => {});

export { feedRouter };
