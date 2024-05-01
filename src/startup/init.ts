import { Express } from "express";
import config from "../utils/config";
import mongooseConnect from "../database/mongodb/mongodb";

const appSetup = async (app: Express) => {
	try {
		await mongooseConnect();

		console.log("MongoDB connected successfully!");

		app.listen(config.PORT, () => {
			console.log(`Server running on port ${config.PORT}`);
		});
	} catch (error: unknown) {
		console.log("Unable to start the app!");
		console.log(error);
	}
};

export default appSetup;
