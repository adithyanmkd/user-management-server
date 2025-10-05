import { Router } from "express";

const router = Router();

// import controllers
import authController from "../controllers/auth.controllers";

// router.get("/", userControllers.getAllUsers); // fetch all users
router.post("/login", authController.login); // admin login

export default router;
