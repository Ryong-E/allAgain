import { v4 as uuidv4 } from "uuid";
const multer = require("multer");
const path = require("path");
const pathSep = path.sep;

const uploadStrategy = (strategy) => {
  const uploadPath = path.join(
    __dirname,
    pathSep,
    "..",
    pathSep,
    "images",
    pathSep,
    strategy
  );

  // 프로필 사진 업로드 미들웨어
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${uuidv4()}.${file.mimetype.split("/")[1]}`);
    },
  });

  const filter = (req, file, callback) => {
    const fileType = file.mimetype.split("/")[1];

    if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
      callback(null, true);
    } else {
      callback({ message: "허용된 파일 확장자가 아닙니다." }, false);
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: filter,
  });

  return upload;
};

export { uploadStrategy };
