import express from "express";
const router = express.Router();

import { login, register } from "./auth.controller";
import { userLoginMiddleware, userRegisterMiddleware } from "./auth.middleware";

router.post("/register", userRegisterMiddleware, register);
router.post("/login", userLoginMiddleware, login);

export { router };
