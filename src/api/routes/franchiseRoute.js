import express from "express";
import { createFranchise, updateFranchise, getAllFranchise, disableFranchise, filterAllFranchise} from "../controllers/franchiseController.js";
import { upload } from "../middlewares/multerS3.js";
const router = express.Router();

router.post("/createFranchise", upload.single("franchiseImage"), createFranchise );
router.put("/updateFranchise",upload.single("franchiseImage"), updateFranchise );
router.get("/getAllFranchise", getAllFranchise );
router.put("/disableFranchise",disableFranchise );


// for admin
router.get("/filterAllFranchise", filterAllFranchise );


export default router;