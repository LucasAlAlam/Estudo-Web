import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.post("/user/create", userController.create);
router.post("/login", userController.login);
router.get("/user", userController.show);

export default router;