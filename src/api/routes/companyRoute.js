import express from "express";
import { getCompany, updateCompany } from "../controllers/compnayController.js";
import { upload } from "../middlewares/multerS3.js";
const router = express.Router();

// for User
router.get("/user/getCompany",getCompany);

// for Admin
router.get("/admin/getCompany",getCompany);
router.put("/admin/updateCompany",upload.single("logo"),updateCompany);


export default router;