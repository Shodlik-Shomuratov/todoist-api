import { Request, Response } from "express";
import { UserModel } from "../../database/mongodb";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import config from "../../utils/config";

export async function register(req: Request, res: Response) {
	const existsUser = await UserModel.findOne({
		email: req.body.email,
	});

	if (existsUser) {
		return res.status(400).json({
			data: null,
			success: false,
			error: "Email already in use!",
		});
	}

	const newUser = new UserModel();

	newUser.firstName = req.body.firstName;
	newUser.lastName = req.body.lastName;
	newUser.email = req.body.email;

	const passwordHash = await hash(req.body.password, 10);
	newUser.passwordHash = passwordHash;

	const user = await newUser.save();

	return res.json({
		data: {
			user,
		},
		success: true,
		error: null,
	});
}

export async function login(req: Request, res: Response) {
	const user = await UserModel.findOne({
		email: req.body.email,
	});

	if (!user) {
		return res.status(400).json({
			data: null,
			success: false,
			error: "User not found!",
		});
	}

	const isPasswordTrue = await compare(req.body.password, user.passwordHash);

	if (!isPasswordTrue) {
		return res.status(400).json({
			data: null,
			success: false,
			error: "Password is wrong!",
		});
	}

	const accessToken = sign(
		{
			_id: user._id,
			email: user.email,
		},
		config.JWT_SECRET_KEY,
		{
			expiresIn: "1d",
		}
	);

	return res.status(200).json({
		data: {
			accessToken,
		},
		success: true,
		error: null,
	});
}
