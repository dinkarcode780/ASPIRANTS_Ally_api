import express from "express";
import { deleteAnnounceMent, getAnnounceMent, getAnnounceMentById, updateAnnounceMent } from "../controllers/announceMentController.js";
import { upload } from "../middlewares/multerS3.js";

const router = express.Router();

router.put("/admin/updateAnnounceMent",upload.fields([{name:"image"},{name:"pdfLink"}]),updateAnnounceMent);


router.get("/users/getAnnounceMent",getAnnounceMent);
router.get("/admin/getAnnounceMent",getAnnounceMent);


router.get("/admin/getAnnounceMentById",getAnnounceMentById);

router.get("/users/getAnnounceMentById",getAnnounceMentById);

router.get("/admin/deleteAnnouceMent",deleteAnnounceMent);

export default router;