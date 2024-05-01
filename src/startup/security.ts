import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";

const securitySetup = (app: Express) => {
	app.use(helmet()).use(cors()).use(express.json());
};

export default securitySetup;
