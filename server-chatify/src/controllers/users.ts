import {Response, Request} from 'express';
import { errorHandler } from '../utils/helpers';

export function me(req:Request, res:Response){
  try {
    res.json(req.user);
    
  } catch (error) {
    errorHandler(res, error);
  }
}