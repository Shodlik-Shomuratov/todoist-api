import { NextFunction, Request, Response } from "express";
import {
	userLoginValidator,
	userRegisterValidator,
} from "../../utils/validators/user.validator";

export async function userRegisterMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (!req.body) {
			return res.status(400).send({ message: "Missing request body!" });
		}

		await userRegisterValidator.validateAsync(req.body);

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

export async function userLoginMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (!req.body) {
			return res.status(400).send({ message: "Missing request body!" });
		}

		await userLoginValidator.validateAsync(req.body);

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
