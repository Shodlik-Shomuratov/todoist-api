import { NextFunction, Request, Response } from "express";
import { RoleEnum } from "../routes/auth/enums/role.enum";

export function roleAccessMiddleware(...roles: RoleEnum[]) {
	return (req: Request, res: Response, next: NextFunction) => {
		const userRole = req.user.role;

		if (!roles.includes(userRole)) {
			return res.status(400).json({
				data: null,
				success: false,
				error: "You are not allowed to request this endpoint!",
			});
		}

		next();
	};
}
