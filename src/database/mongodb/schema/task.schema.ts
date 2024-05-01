import { Document, Schema, model } from "mongoose";

export enum TaskStatusEnum {
	NEW = "new",
	COMPLETED = "completed",
}

export interface ITask extends Document {
	text: string;
	status: TaskStatusEnum;
}

const schema = new Schema({
	text: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: TaskStatusEnum,
		default: TaskStatusEnum.NEW,
	},
});

export default model<ITask>("tasks", schema);
