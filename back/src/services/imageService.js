import { Image } from "../db/Image";
import path from "path";

const imageService = {
  saveImageUrls: async ({ imagePaths }) => {
    const imageUrls = [];
    for (const imagePath of imagePaths) {
      const re = new RegExp(`feeds.*`, "g");
      const serverUrl = process.env.SERVER_URL || "localhost";
      const serverPort = process.env.SERVER_PORT || 5001;
      const url = imagePath["path"].match(re)[0].split("\\")[1];
      const imageId = await Image.saveImageUrl({
        name: imagePath.name,
        url,
      });
      const imageUrl = path.join(
        serverUrl + ":" + serverPort,
        "/",
        imagePath["path"].match(re)[0]
      );
      imageUrls.push({ id: imageId, name: imagePath.name, url: imageUrl });
    }

    return imageUrls;
  },
};

export { imageService };
