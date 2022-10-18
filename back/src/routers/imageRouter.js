import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { uploadStrategy } from "../middlewares/imageUploadMiddleware";
import { imageService } from "../services/imageService";

const imageRouter = Router();

imageRouter.post(
  "/feeds",
  loginRequired,
  uploadStrategy("feeds").array("image"),
  async (req, res, next) => {
    const imagePaths = [];
    req.files.forEach((file) => {
      imagePaths.push({ name: file.fieldname, path: file.path });
    });
    try {
      const savedImageUrls = await imageService.saveImageUrls({ imagePaths });
      res.status(200).send(savedImageUrls);
    } catch (error) {
      next(error);
    }
  }
);

export { imageRouter };
