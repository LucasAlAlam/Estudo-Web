import { Router } from "express";
import userController from "../controllers/userController";
import passport from "passport";

const router = Router();

router.post("/user/create", userController.create);
router.post("/login", userController.login);
router.get("/user", passport.authenticate('jwt', {session: false}), userController.show);

export default router;
