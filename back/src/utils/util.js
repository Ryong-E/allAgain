import path from "path";

// bcrypt
const SALT_ROUND = 10;

/**
 * image파일 이름을 원하는 path경로의 서버 URL로 변환
 * @param {string} directory 폴더 이름
 * @param {string} image 이미지 파일 이름
 * @returns serverUrl + serverPort + path + image
 */
const makeImageUrl = (directory, image) => {
  const serverUrl = process.env.SERVER_URL ?? "localhost";
  const serverPort = process.env.SERVER_PORT ?? 5000;
  const imageUrl = path.join(
    serverUrl + ":" + serverPort,
    "/",
    directory,
    "/",
    image
  );

  return imageUrl;
};

export { makeImageUrl, SALT_ROUND };
