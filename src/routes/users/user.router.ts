import express from "express";
import { getAll } from "./user.controller";
const router = express.Router();

router.get("/", getAll);

export { router };
