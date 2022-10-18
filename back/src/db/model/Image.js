import { _dbConn } from "./pool";

const Image = {
  saveImageUrl: async ({ name, url }) => {
    const connection = await _dbConn.getConnection(async (conn) => conn);
    await connection.query("INSERT INTO images(name, url) VALUES(?, ?)", [
      name,
      url,
    ]);
    const savedImage = await connection.query(
      "SELECT id FROm images WHERE url = ?",
      url
    );
    return savedImage[0][0]["id"];
  },
  getImages: async ({ feedId }) => {
    const connection = await _dbConn.getConnection(async (conn) => conn);
    const imageUrls = await connection.query(
      "SELECT images.id, images.name, images.url FROM feeds_images JOIN images WHERE feeds_images.image_id = images.id and feeds_images.feed_id = ?",
      feedId
    );
    return imageUrls;
  },
};

export { Image };
