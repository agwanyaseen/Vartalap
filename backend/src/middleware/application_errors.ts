import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { GenericResponseModel } from "../models/models";

class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 200) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}



const errorHandler  = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) : void =>  {
    
    console.log(`EXCEPTION OCCURED`);
    console.log(`Message : ${err.message}, Stack Trace : ${err.stack?.toString()}`);
    if (err instanceof AppError) {
     res.status(err.statusCode).json(GenericResponseModel.failure(err.message));
  }

  // Handle unexpected errors
  res.status(500).json(GenericResponseModel.failure(`Message : ${err.message}, Stack Trace : ${err.stack?.toString()}`));
};

export { AppError, errorHandler };
