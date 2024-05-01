import { Express } from "express";
import { authRouter, taskRouter, userRouter } from "../routes";

const routerSetup = (app: Express) => {
	app.use("/user", userRouter);
	app.use("/task", taskRouter);
	app.use("/auth", authRouter);
};

export default routerSetup;
