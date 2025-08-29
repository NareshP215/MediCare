import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnections } from "./database/dbConnections.js";
import messageRouter from "./router/messageRouter.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import checkupRouter from "./router/checkupRouter.js"

const app = express();
config({ path: "./config/config.env" });

app.use(cors({
    origin: [
        process.env.FRONTEND_URL,
        process.env.DASHBOARD_URL,
        process.env.FRONTEND_PROD,
        process.env.DASHBOARD_PROD,
        "http://127.0.0.1:5000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/checkup", checkupRouter);

dbConnections();

app.use(errorMiddleware);
export default app;