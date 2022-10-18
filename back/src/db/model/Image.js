import { pool, promisePool } from "..";

const Image = {
  saveImageUrl: async ({ name, url }) => {
    await promisePool.query("INSERT INTO images(name, url) VALUES(?, ?)", [
      name,
      url,
    ]);
    const savedImage = await promisePool.query(
      "SELECT id FROM images WHERE url = ?",
      url
    );
    return savedImage[0][0]["id"];
  },
  getImages: async ({ feedId }) => {
    const imageUrls = await promisePool.query(
      "SELECT images.id, images.name, images.url FROM feeds_images JOIN images WHERE feeds_images.image_id = images.id and feeds_images.feed_id = ?",
      feedId
    );
    return imageUrls;
  },
};

export { Image };
