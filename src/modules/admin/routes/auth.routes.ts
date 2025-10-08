import { Router } from "express";

const router = Router();

// import controllers
import authController from "../controllers/auth.controllers";

router.post("/login", authController.login); // admin login

export default router;
