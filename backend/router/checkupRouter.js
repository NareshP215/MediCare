import express from "express";
import { isAdminAuthnticated } from "../middlewares/auth.js";
import { getAllCheckup, sendCheckup } from "../controller/checkupController.js";

const router = express.Router();

router.post("/send", sendCheckup);
router.get("/getall", isAdminAuthnticated, getAllCheckup)

export default router;