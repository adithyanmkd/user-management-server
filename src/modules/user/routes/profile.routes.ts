import { Router } from "express";

// import controllers
import profileController from "../controllers/profile.controller";

// import middlewares
import { authenticateJWT } from "../../../middleware/auth";

const router = Router();

router.use(authenticateJWT);

router.patch("/change-name", profileController.changeName); // update name
router.patch("/change-password", profileController.changePassword); // update password

export default router;
