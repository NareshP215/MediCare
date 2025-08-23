import express from "express";
import { getAllMessage, sendMessage } from "../controller/messageController.js";
import { isAdminAuthnticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAdminAuthnticated, getAllMessage)

export default router;