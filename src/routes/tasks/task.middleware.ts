import { NextFunction, Request, Response } from "express";
import { taskCreateValidator } from "../../utils/validators/task.validator";

export async function taskCreateMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (!req.body) {
			return res.status(400).send({ message: "Missing request body!" });
		}

		await taskCreateValidator.validateAsync(req.body);

		next();
	} catch (error: any) {
		if (error.stack.includes("ValidationError")) {
			return res.status(400).json({
				data: null,
				success: false,
				error: error.message,
			});
		}

		return res.status(500).json({
			data: null,
			success: false,
			error: "Internal server error!",
		});
	}
}

export async function getOneTaskMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
	} catch (error: any) {
		if (error.stack.includes("ValidationError")) {
			return res.status(400).json({
				data: null,
				success: false,
				error: error.message,
			});
		}

		return res.status(500).json({
			data: null,
			success: false,
			error: "Internal server error!",
		});
	}
}
