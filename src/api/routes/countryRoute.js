import express from "express";
import { createCountry, getCounteryByfilter, getCountryById, updateCountry,disableCountry,getCounteryByBoucher } from "../controllers/countryController.js";
import { upload } from "../middlewares/multerS3.js";

const router = express.Router();

router.post("/admin/createCountry",upload.single("image"),createCountry);

router.put("/admin/updateCountry",upload.fields([{name:"image"},{name:"pdfDownloadLink"}]),updateCountry);

router.get("/admin/getCounteryByfilter",getCounteryByfilter);
router.get("/admin/getCountryById",getCountryById);

router.get("/users/getCounteryByfilter",getCounteryByfilter);

router.get("/users/getCountryById",getCountryById);
router.get("/users/getCounteryByBoucher",getCounteryByBoucher);

router.delete("/admin/deleteCountry",disableCountry);
router.put("/admin/disableCountry",disableCountry);





export default router;