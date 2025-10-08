import { Router } from "express";
const router = Router();

// import controller
import adminUsersController from "../controllers/adminUser.controllers";
import { authenticateJWT, adminOnly } from "../../../middleware/auth";

router.use(authenticateJWT, adminOnly); // middleware

router.get("/", adminUsersController.getAllUsers); // fetch all users
router.delete("/delete/:id", adminUsersController.deleteUser); // delete user
router.patch("/update/:id", adminUsersController.updateUser); // update user

export default router;
