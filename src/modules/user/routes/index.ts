import { Router } from "express";

// import routes
import userRoutes from "../../admin/routes/user.routes";
import authRoutes from "./auth.routes";
import profileRoutes from "./profile.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

export default router;
