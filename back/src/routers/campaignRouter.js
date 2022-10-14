import { Router } from "express";
import { campaignService } from "../services/campaignService";
import { loginRequired } from "../middlewares/loginRequired";
import { uploadStrategy } from "../middlewares/imageUploadMiddleware";
import { campaignCreateValidator } from "../middlewares/campaignValidator";

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

export { campaignRouter };
