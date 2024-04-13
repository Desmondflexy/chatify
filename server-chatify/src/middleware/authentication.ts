import { NextFunction, Request, Response } from "express";
import { devLog, verifyToken } from "../utils/helpers";

export interface IPayload {
  id: string;
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
  if (!token) return res.status(401).json("Unauthorized");

  try {
    const decodedPayload = verifyToken(token);
    req.user = decodedPayload as IPayload;
    next();
  } catch(error) {
    devLog(error);
    return res.status(401).json("Unauthorized");
  }
}

declare module "express-serve-static-core" {
  interface Request {
    user: IPayload;
  }
}
