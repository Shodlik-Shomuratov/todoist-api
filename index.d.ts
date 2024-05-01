import { Express } from "express-serve-static-core";

type TokenType = string & JwtPayload;

declare module "express-serve-static-core" {
	interface Request {
		user: TokenType;
	}
}
