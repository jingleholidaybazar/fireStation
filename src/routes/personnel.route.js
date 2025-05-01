import { Router } from "express";
import {
  createPersonnel,
  deletePersonnel,
  getAllPersonnel,
  getPersonnelById,
  updatePersonnel,
} from "../controllers/personnel.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router("/").get(getAllPersonnel).post(createPersonnel);
router
  .route("/:id")
  .get(getPersonnelById)
  .patch(updatePersonnel)
  .delete(deletePersonnel);
export default router;
