import { Image } from "../db/model/Image";
import { makeImageUrl } from "../utils/util";
import path from "path";

const imageService = {
  saveImageUrls: async ({ imagePaths }) => {
    const imageUrls = [];
    for (const imagePath of imagePaths) {
      const imageId = await Image.saveImageUrl({
        name: imagePath.name,
        url: imagePath.path,
      });
      const imageUrl = makeImageUrl("feeds", imagePath.path);
      imageUrls.push({ id: imageId, name: imagePath.name, url: imageUrl });
    }

    return imageUrls;
  },
  getImageUrls: async ({ feedId }) => {
    const imageData = await Image.getImages({ feedId });
    const imageUrls = [];
    for (const image of imageData[0]) {
      const { id, name, url } = image;
      imageUrls.push({
        id,
        name,
        url: makeImageUrl("feeds", url),
      });
    }
    return imageUrls;
  },
};

export { imageService };
