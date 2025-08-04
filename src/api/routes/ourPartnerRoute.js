import express from "express";
import { createPartners, updatePartners, getAllPartners, disablePartners, filterAllPartners } from "../controllers/ourPartnerController.js";
import { upload } from "../middlewares/multerS3.js";
const router = express.Router();

router.post("/createPartners", upload.single("brandImage"), createPartners );
router.put("/updatePartners",upload.single("brandImage"), updatePartners );
router.get("/getAllPartners",getAllPartners );
router.put("/disablePartners",disablePartners );

// for admin
router.get("/filterAllPartners",filterAllPartners );


export default router;