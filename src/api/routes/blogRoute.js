import express from "express";
import { upload } from "../middlewares/multerS3.js";
import { createBlog, deleteBlog, getBlogById, getBlogsByFilter, updateBlog } from "../controllers/blogController.js";


const router = express.Router();

router.post("/admin/createBlog", upload.single("image"), createBlog);
router.put("/admin/updateBlog", upload.single("image"), updateBlog);
router.delete("/admin/deleteBlog", deleteBlog);
router.get("/admin/getBlogById", getBlogById);
router.get("/users/getBlogsByFilter", getBlogsByFilter);
router.get("/admin/getBlogsByFilter", getBlogsByFilter);

export default router;