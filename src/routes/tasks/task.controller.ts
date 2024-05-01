import { Request, Response } from "express";
import { TaskModel } from "../../database/mongodb";
import { MongooseError } from "mongoose";

export async function createTask(req: Request, res: Response) {
	const newTask = new TaskModel();
	newTask.text = req.body.text;

	const task = await newTask.save();

	return res.status(200).json({
		data: {
			task,
		},
		success: true,
		error: null,
	});
}

export async function getAllTasks(req: Request, res: Response) {
	const tasks = await TaskModel.find({});

	return res.status(200).json({
		data: {
			tasks,
		},
		success: true,
		error: null,
	});
}

export async function getOneTaskById(req: Request, res: Response) {
	const id = req.params.id;

	const task = await TaskModel.findById(id);

	if (!task) {
		return res.status(404).json({
			data: null,
			success: false,
			error: "Task not found!",
		});
	}

	return res.status(200).json({
		data: {
			task,
		},
		success: true,
		error: null,
	});
}

export async function updateTask(req: Request, res: Response) {
	try {
		const id = req.params.id;

		const task = await TaskModel.findById(id);

		if (!task) {
			return res.status(404).json({
				data: null,
				success: false,
				error: "Task not found!",
			});
		}

		const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, {
			returnDocument: "after",
		});

		return res.status(200).json({
			data: {
				updated: true,
				task: updatedTask,
			},
			success: true,
			error: null,
		});
	} catch (error: any) {
		if (error instanceof MongooseError) {
			return res.status(500).json({
				data: null,
				success: false,
				error: "Database connection lost!",
			});
		}

		return res.status(500).json({
			data: null,
			success: false,
			error: "Internal server error!",
		});
	}
}

export async function deleteTask(req: Request, res: Response) {
	try {
		const id = req.params.id;

		const task = await TaskModel.findById(id);

		if (!task) {
			return res.status(404).json({
				data: null,
				success: false,
				error: "Task not found!",
			});
		}

		const deletedTask = await TaskModel.findByIdAndDelete(id, {
			returnDocument: "after",
		});

		return res.status(200).json({
			data: {
				deleted: true,
				task: deletedTask,
			},
			success: true,
			error: null,
		});
	} catch (error) {
		if (error instanceof MongooseError) {
			return res.status(500).json({
				data: null,
				success: false,
				error: "Database connection lost!",
			});
		}

		return res.status(500).json({
			data: null,
			success: false,
			error: "Internal server error!",
		});
	}
}
