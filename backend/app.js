import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { dbConnection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import timelineRouter from "./routes/timelineRouter.js";
import messageRouter from "./routes/messageRouter.js";
import skillRouter from "./routes/skillRouter.js";
import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
import projectRouter from "./routes/projectRouter.js";
import ejs from "ejs";
import path from "node:path";
import { fileURLToPath } from "url"; // <-- Import this from 'url' to get path from ES module

const __filename = fileURLToPath(import.meta.url); // <-- Get current file path
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));
app.get("/form", (req, res) => {
  res.render("form");
});
app.get("/form1", (req, res) => {
  res.render("form1");
});
app.get("/skillForm", (req, res) => {
  res.render("skillForm");
});
app.get("/projectForm", (req, res) => {
  res.render("projectForm");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/project", projectRouter);

dbConnection();
app.use(errorMiddleware);

export default app;
