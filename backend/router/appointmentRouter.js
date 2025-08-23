import express from "express";
import { deleteAppointement, getAllAppointement, postAppointment, updateAppointementStatus } from "../controller/appointmentController.js";
import { isAdminAuthnticated, isPatientAuthnticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/post", isPatientAuthnticated, postAppointment);
router.get("/getall", isAdminAuthnticated, getAllAppointement);
router.put("/update/:id", isAdminAuthnticated, updateAppointementStatus);
router.delete("/update/:id", isAdminAuthnticated, deleteAppointement);

export default router;