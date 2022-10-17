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
  const imageUrl = path.join(serverUrl + ":" + serverPort, directory, image);

  return imageUrl;
};

/**
 * 요청한 userId와 로그인 한 userId 비교
 * @param {*} userId param에서 받아온 userId
 * @param {*} currentUserId jwt에서 받아온 userId
 * @returns true or throw new Error("권한이 없습니다.")
 */
const compareUserId = (userId, currentUserId) => {
  if (userId != currentUserId) {
    throw new Error("권한이 없습니다.");
  }

  return true;
};

export { SALT_ROUND, makeImageUrl, compareUserId };
