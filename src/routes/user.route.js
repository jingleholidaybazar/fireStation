import { Router } from "express";
import {
  createUser,
  userLogin,
  verifyOTP,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middlewares.js";

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), createUser);

router.route("/sendotp").post(userLogin);
router.route("/verifyotp").post(verifyOTP);

export default router;
