import { Request, Response } from "express";
import User from "../models/user";
import * as joi from "../utils/validators";
import { attachToken, errorHandler, generateToken } from "../utils/helpers";
import bcrypt from "bcryptjs";

export async function signup(req: Request, res: Response) {
  try {
    const { value, error } = joi.signup.validate(req.body);
    if (error) return res.status(400).json(error.message);
    let user = await User.findOne({ email: value.email });
    if (user) return res.status(409).json("User already exists!");

    user = new User({ ...value, password: await bcrypt.hash(value.password, 10) });
    await user.save();
    res.json(`User ${user.displayName} created successfully!`);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { value, error } = joi.login.validate(req.body);
    if (error) return res.status(400).json(error.message);

    let user = await User.findOne({ email: value.email });
    if (!user) return res.status(401).json("Invalid credentials!");

    const isValid = await bcrypt.compare(value.password, user.password);
    if (!isValid) return res.status(401).json("Invalid credentials!");

    const token = generateToken(user);
    attachToken(token, res);
    res.json(token);
  } catch (error) {
    errorHandler(res, error);
  }
}
