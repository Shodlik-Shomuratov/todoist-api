import { Schema, model } from "mongoose";
import { RoleEnum } from "../../../routes/auth/enums/role.enum";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	passwordHash: string;
}

const schema = new Schema<IUser>({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		type: String,
		required: true,
		default: RoleEnum.USER,
	},
	passwordHash: {
		type: String,
		required: true,
	},
});

export default model<IUser>("users", schema);
