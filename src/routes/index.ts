import { Router } from "express";
import UserRoutes from "./user"; 
import PostRoutes from "./post";
import ImageRoutes from "./image";

const router = Router();

router.use("/user", UserRoutes);
router.use("/post", PostRoutes);

export default router;
