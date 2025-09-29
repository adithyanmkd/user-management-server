import { Router } from "express";

// import controllers
import userControllers from "../controllers/user.constrollers";

const router = Router();

router.get("/", userControllers.getAllUsers); // fetch all users

export default router;
