import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import {auth} from "../middlewares/authMiddleware.js"
const router = express.Router();

router.get("/admin/dashboard", getDashboard)
export default router;
