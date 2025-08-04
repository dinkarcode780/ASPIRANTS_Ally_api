import express from "express";
import { createTestimonial, disableTestimonial, getTestimonialById, getTestimonialsByFilter, updateTestimonial } from "../controllers/testimonialController.js";
import { upload } from "../middlewares/multerS3.js";


const router = express.Router();

router.post("/admin/createTestimonial", upload.single("image"), createTestimonial);
router.put("/admin/updateTestimonial", upload.single("image"), updateTestimonial);
router.delete("/admin/deleteTestimonial", disableTestimonial);
router.get("/admin/getTestimonialById", getTestimonialById);
router.get("/users/getTestimonialsByFilter", getTestimonialsByFilter);
router.get("/admin/getTestimonialsByFilter", getTestimonialsByFilter);

export default router;