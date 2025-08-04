import express from "express";
import { getAll, createSubcribe, unSubsctribe, getSubCribeById } from "../controllers/subscribeController.js";
const router = express.Router();

router.get("/getAll", getAll);
router.post("/createSubcribe", createSubcribe);

router.get("/getSubCribeById",getSubCribeById);

router.delete("/unSubscribe",unSubsctribe);

export default router;
