import express from "express";
import { createCollege, updateCollege, getCollegeById, filterAllCollege,disableCollage,filterAllCollegeUser } from "../controllers/collegeController.js";
import { upload } from "../middlewares/multerS3.js";
const router = express.Router();

router.post("/createCollege",upload.fields([{name:"image"}]),createCollege);
router.put("/updateCollege",upload.fields([{name:"image"}]), updateCollege);
router.get("/getCollegeById",getCollegeById);
router.get("/userFilterAllCollege",filterAllCollege);
router.get("/filterAllCollegeUser",filterAllCollegeUser);

// for admin
router.get("/adminFilterAllCollege",filterAllCollege);
router.get("/adminFilterAllCollege",filterAllCollege);
router.post("/admin/createCollege",upload.fields([{name:"image"}]),createCollege);
router.put("/admin/updateCollege",upload.fields([{name:"image"}]), updateCollege);
router.get("/admin/getCollegeById",getCollegeById);
router.put("/admin/disableCollage",disableCollage);




export default router;