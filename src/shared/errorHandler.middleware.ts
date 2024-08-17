import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  name: string;
  httpCode?: number;
  description?: string;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.httpCode = err.httpCode || 500;
  err.description = err.description;

  if (process.env.NODE_ENV === "development") {
    res.status(err.httpCode).json({
      name: err.name,
      statusCode: err.httpCode,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    if (err.isOperational) {
      res.status(err.httpCode).json({
        status: err.description,
        message: err.message,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  }
};
