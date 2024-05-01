import express from "express";
import { createTask, getAllTasks, getOneTaskById } from "./task.controller";
import { getOneTaskMiddleware, taskCreateMiddleware } from "./task.middleware";
import { jwtTokenMiddleware } from "../../middlewares/jwt-token.middleware";
import { roleAccessMiddleware } from "../../middlewares/role-access.middleware";
import { RoleEnum } from "../auth/enums/role.enum";
const router = express.Router();

// Create task
router.post(
	"/",
	jwtTokenMiddleware,
	roleAccessMiddleware(RoleEnum.USER),
	taskCreateMiddleware,
	createTask
);

// Get all tasks
router.post(
	"/",
	jwtTokenMiddleware,
	roleAccessMiddleware(RoleEnum.USER, RoleEnum.ADMIN),
	getAllTasks
);

// Get one task by id
router.get(
	"/:id",
	jwtTokenMiddleware,
	roleAccessMiddleware(RoleEnum.ADMIN, RoleEnum.USER),
	getOneTaskMiddleware,
	getOneTaskById
);

export { router };
