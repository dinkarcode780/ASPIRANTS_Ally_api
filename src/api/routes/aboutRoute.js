import express from "express";
import { deleteAbout, getAbout, getAboutById, updateAbout } from "../controllers/aboutController.js";
import { upload } from "../middlewares/multerS3.js";

const router = express.Router();

// router.put(
//   "/admin/updateAbout",
//   upload.fields([
//     { name: "teamMembers[0].image", maxCount: 1 },
//     { name: "teamMembers[1].image", maxCount: 1 },
//     { name: "teamMembers[2].image", maxCount: 1 },
//     { name: "teamMembers[3].image", maxCount: 1 },
//     { name: "coreValues[0].coreImage" },
//     { name: "coreValues[1].coreImage" },
//     { name: "coreValues[2].coreImage" },
//     { name: "coreValues[3].coreImage" },
//     { name: "coreValues[4].coreImage" },
//     { name: "coreValues[5].coreImage" },
//     {name:"image"},
//   ]),
//   updateAbout
// );

router.put(
  "/admin/updateAbout",
  upload.any(), 
  updateAbout
);
router.get("/admin/getAbout",getAbout);

router.get("/users/getAbout",getAbout);

router.get("/users/getAboutById",getAboutById);
router.get("/admin/getAboutById",getAboutById);


router.delete("/admin/deleteAbout",deleteAbout);


export default router;
