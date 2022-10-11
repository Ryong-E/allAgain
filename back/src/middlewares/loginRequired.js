import jwt from "jsonwebtoken";

const loginRequired = (req, res, next) => {
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
};
