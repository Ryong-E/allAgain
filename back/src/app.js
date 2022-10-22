import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { userRouter } from "./routers/userRouter";
import { feedRouter } from "./routers/feedRouter";
import { campaignRouter } from "./routers/campaignRouter";
import { imageRouter } from "./routers/imageRouter";
import cors from "cors";

const app = express();

app.use(express.static(__dirname + "/images"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("team02 project");
});

app.use("/users", userRouter);
app.use("/feeds", feedRouter);
app.use("/campaigns", campaignRouter);
app.use("/images", imageRouter);

app.use(errorMiddleware);

export { app };
