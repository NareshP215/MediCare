import express from "express";
import { addNewAdmin, login, patientRegister, getAllDocter, getUserDetails, logoutAdmin, logoutPatient, addNewDocter } from "../controller/userController.js";
import { isAdminAuthnticated, isPatientAuthnticated } from "../middlewares/auth.js"

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthnticated, addNewAdmin);
router.get("/docters", getAllDocter);
router.get("/admin/me", isAdminAuthnticated, getUserDetails);
router.get("/patient/me", isPatientAuthnticated, getUserDetails);
router.get("/admin/logout", isAdminAuthnticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthnticated, logoutPatient);
router.post("/docter/addnew", isAdminAuthnticated, addNewDocter);

export default router;