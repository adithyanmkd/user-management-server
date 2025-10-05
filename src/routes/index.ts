import { Router } from "express";

const router = Router();

// import routes
import userRoutes from "../modules/user/routes/index";
import adminRoutes from "../modules/admin/routes/index";

router.use("/", userRoutes); // all user routes
router.use("/admin", adminRoutes); // all admin routes

export default router;
