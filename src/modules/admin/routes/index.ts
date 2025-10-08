import { Router } from "express";

const router = Router();

import authRoutes from "./auth.routes";
import userRoutes from "./adminUser.routes";

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
