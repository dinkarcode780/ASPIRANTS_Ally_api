import express from "express";
import { createFAQ,deleteFaq, getAllFAQ, getFAQById,updateFaq,disableFaq } from "../controllers/faqController.js";


const router = express.Router();

// for user
router.get("/users/getFAQById", getFAQById);
router.get("/users/getAllFAQ", getAllFAQ);


// for admin
router.post("/admin/createFAQ", createFAQ);
router.get("/admin/getAllFAQ", getAllFAQ);
router.get("/admin/getFAQById", getFAQById);

router.put("/admin/updateFaq",updateFaq);

router.delete("/admin/deleteFaq",deleteFaq);

router.put("/admin/disableFaq",disableFaq);





export default router;