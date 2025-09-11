import { Router } from "express";

// import controllers
import authControllers from "../controllers/auth.controllers";

// import middlewares
import { authenticateJWT } from "../../../middleware/auth";

const router = Router();

router.post("/login", authControllers.login); // login
router.post("/register", authControllers.register); // register
router.get("/me", authenticateJWT, authControllers.currentUser); // get current user (for profile)

export default router;
