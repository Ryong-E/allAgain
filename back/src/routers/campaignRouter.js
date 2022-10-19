import { Router } from "express";
import { campaignService } from "../services/campaignService";
import { loginRequired } from "../middlewares/loginRequired";
import { uploadStrategy } from "../middlewares/imageUploadMiddleware";
import {
  campaignCreateValidator,
  getCampaignValidator,
  updateCampaignValidator,
  deleteCampaignValidator,
  campaignImageCreateValidator,
  campaignIdCheckValidator,
  createCommentValidator,
  putCommentValidator,
  deleteCommentValidator,
} from "../middlewares/campaignValidator";

const campaignRouter = Router();

campaignRouter.post(
  "/",
  loginRequired,
  uploadStrategy("campaignThumbnail").fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  campaignCreateValidator(),
  async (req, res, next) => {
    try {
      const { filename: thumbnail } = req.files.thumbnail[0];
      const { currentUserId } = req;
      const createdCampaign = await campaignService.postCampaign({
        currentUserId,
        ...req.body,
        thumbnail,
      });

      res.status(201).json(createdCampaign);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.get("/", async (req, res, next) => {
  try {
    const campaigns = await campaignService.getAllCampaigns();

    res.status(200).json(campaigns);
  } catch (error) {
    next(error);
  }
});

campaignRouter.get(
  "/campaign/:campaignId",
  loginRequired,
  getCampaignValidator(),
  async (req, res, next) => {
    try {
      const { currentUserId } = req;
      const { campaignId } = req.params;
      const campaign = await campaignService.getCampaign({
        campaignId,
        currentUserId,
      });

      res.status(200).json(campaign);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.get(
  "/campaign/guest/:campaignId",
  getCampaignValidator(),
  async (req, res, next) => {
    try {
      const { campaignId } = req.params;
      const campaign = await campaignService.getCampaignForGuest({
        campaignId,
      });

      res.status(200).json(campaign);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.put(
  "/:campaignId",
  loginRequired,
  uploadStrategy("campaignThumbnail").fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateCampaignValidator(),
  async (req, res, next) => {
    try {
      const thumbnail = req.files.thumbnail
        ? req.files.thumbnail[0].filename
        : undefined;
      const { currentUserId } = req;
      const { campaignId } = req.params;
      const updatedCampaign = await campaignService.updateCampaign({
        currentUserId,
        ...req.body,
        thumbnail,
        campaignId,
      });

      res.status(201).json(updatedCampaign);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.delete(
  "/:campaignId",
  loginRequired,
  deleteCampaignValidator(),
  async (req, res, next) => {
    try {
      const { currentUserId } = req;
      const { campaignId } = req.params;
      const deletedCampaign = await campaignService.deleteCampaign({
        currentUserId,
        campaignId,
      });

      res.status(204).json(deletedCampaign);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.post(
  "/images",
  loginRequired,
  uploadStrategy("campaignImages").single("image"),
  campaignImageCreateValidator(),
  async (req, res, next) => {
    try {
      const { filename } = req.file;
      const createdImage = await campaignService.postCampaignImages({
        filename,
      });

      res.status(201).json(createdImage);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.post(
  "/:campaignId/participants",
  loginRequired,
  campaignIdCheckValidator(),
  async (req, res, next) => {
    try {
      const { currentUserId } = req;
      const { campaignId } = req.params;

      const participatedCampaign = await campaignService.postParticipant({
        currentUserId,
        campaignId,
      });

      res.status(201).json(participatedCampaign);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.delete(
  "/:campaignId/participants",
  loginRequired,
  campaignIdCheckValidator(),
  async (req, res, next) => {
    try {
      const { currentUserId } = req;
      const { campaignId } = req.params;

      const canceledParticipate = await campaignService.deleteParticipant({
        currentUserId,
        campaignId,
      });

      res.status(204).json(canceledParticipate);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.post(
  "/campaign/comments",
  createCommentValidator(),
  loginRequired,
  async (req, res, next) => {
    try {
      const { currentUserId } = req;
      const { campaignId, content, rootCommentId } = req.body;

      const createdComment = await campaignService.postComment({
        currentUserId,
        campaignId,
        content,
        rootCommentId,
      });

      res.status(201).json(createdComment);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.put(
  "/campaign/:commentId",
  putCommentValidator(),
  loginRequired,
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const { currentUserId } = req;

      const updatedComment = await campaignService.updateComment({
        commentId,
        content,
        currentUserId,
      });

      res.status(201).json(updatedComment);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.delete(
  "/campaign/:commentId",
  deleteCommentValidator(),
  loginRequired,
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { currentUserId } = req;

      const deletedComment = await campaignService.deleteComment({
        currentUserId,
        commentId,
      });

      res.status(204).json(deletedComment);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.delete("/campaign/:commentId");
export { campaignRouter };
