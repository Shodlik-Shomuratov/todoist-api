import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, JwtPayload, verify } from "jsonwebtoken";
import config from "../utils/config";

export interface MyRequest extends Request {
	user: string | JwtPayload;
}

export async function jwtTokenMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(400).json({
				data: null,
				success: false,
				error: "JWT token required!",
			});
		}

		const data = verify(token, config.JWT_SECRET_KEY);

		req.user = data;

		next();
	} catch (error: any) {
		if (error instanceof JsonWebTokenError) {
			return res.status(400).json({
				data: null,
				success: false,
				error: "Invalid token!",
			});
		}

		return res.status(500).json({
			data: null,
			success: false,
			error: "Internal server error!",
		});
	}
}
