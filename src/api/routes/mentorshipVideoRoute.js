import express from "express";
import { createMentorShipVideo,deleteMentorShipVideo, getMentorShipVideo, getMentorShipVideoById, updateMentorShipVideo } from "../controllers/mentorshipVideoController.js";

const router = express.Router();

router.post("/admin/createMentorShipVideo",createMentorShipVideo);

router.put("/admin/updateMentorShipVideo",updateMentorShipVideo);

router.get("/admin/getMentorShipVideo",getMentorShipVideo);
router.get("/users/getMentorShipVideo",getMentorShipVideo);

router.get("/admin/getMentorShipVideoById",getMentorShipVideoById);
router.get("/users/getMentorShipVideoById",getMentorShipVideoById);

router.delete("/admin/deleteMentorShipVideo",deleteMentorShipVideo);





export default router;