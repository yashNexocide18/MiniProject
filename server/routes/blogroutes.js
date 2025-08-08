import express from "express";
import authmid from "../middleware/authmid.js";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getBlog,
  getUserBlogs,
  updateBlog,
} from "../controllers/blogcontrol.js";

const router = express.Router();

router.post("/create",authmid, createBlog);
router.delete("/delete/:id",authmid, deleteBlog);
router.get("/getblogs", getBlogs);
router.get("/getblog/:id", getBlog);
router.get("/getuserblogs/:id", getUserBlogs);
router.put("/update/:id",authmid, updateBlog);

export default router;
