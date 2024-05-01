import { connect } from "mongoose";
import config from "../../utils/config";

export default async function mongooseConnect(): Promise<void> {
	await connect(config.MONGODB_URI);
}
