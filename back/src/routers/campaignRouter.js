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
      const thumbnail = req.files.thumbnail
        ? req.files.thumbnail[0].path
        : "null";
      const currentUserId = req.currentUserId;
      const createdCampaign = await campaignService.addCampaign({
        userId: currentUserId,
        ...req.body,
        thumbnail,
      });

      res.status(201).json(createdCampaign);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.get("/", loginRequired, async (req, res, next) => {
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
      const { campaignId } = req.params;
      const campaign = await campaignService.getCampaign({ campaignId });

      res.status(200).json(campaign);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.put(
  "/",
  loginRequired,
  uploadStrategy("campaignThumbnail").fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateCampaignValidator(),
  async (req, res, next) => {
    try {
      const thumbnail = req.files.thumbnail
        ? req.files.thumbnail[0].path
        : "null";
      const currentUserId = req.currentUserId;
      const updatedCampaign = await campaignService.updateCampaign({
        userId: currentUserId,
        ...req.body,
        thumbnail,
      });

      res.status(201).json(updatedCampaign);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.delete(
  "/",
  loginRequired,
  deleteCampaignValidator(),
  async (req, res, next) => {
    try {
      const currentUserId = req.currentUserId;
      const { campaignId } = req.body;
      const deletedCampaign = await campaignService.deleteCampaign({
        userId: currentUserId,
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
      const image = req.file.path;
      const createdImage = await campaignService.addCampaignImages({ image });

      res.status(201).json(createdImage);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.post(
  "/participants",
  loginRequired,
  campaignIdCheckValidator(),
  async (req, res, next) => {
    try {
      const currentUserId = req.currentUserId;
      const { campaignId } = req.body;

      const participatedCampaign = await campaignService.addParticipant({
        userId: currentUserId,
        campaignId,
      });

      res.status(201).json(participatedCampaign);
    } catch (error) {
      next(error);
    }
  }
);

campaignRouter.delete(
  "/participants",
  loginRequired,
  campaignIdCheckValidator(),
  async (req, res, next) => {
    try {
      const currentUserId = req.currentUserId;
      const { campaignId } = req.body;

      const canceledParticipate = await campaignService.deleteParticipant({
        userId: currentUserId,
        campaignId,
      });

      res.status(204).json(canceledParticipate);
    } catch (error) {
      next(error);
    }
  }
);
export { campaignRouter };
