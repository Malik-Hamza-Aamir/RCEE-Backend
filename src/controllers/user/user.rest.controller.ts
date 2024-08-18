// controllers validate the input
// throws error if input is incorrect
// pass to service layer for either database query writing or any other operation
// if we only need to write in db then it can also be done here and skip the service layer
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/error";
import { userSchema } from "../../shared/zod.schema";
import { z } from "zod";
import { LoginService } from "../../services/user/user.service";

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginData = userSchema.parse(req.body);
    LoginService(loginData);
    res.status(201).json({ message: "User registration successful" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => {
        return `${err.message}`;
      });

      return next(
        new AppError(
          "Invalid or missing email and password",
          400,
          errorMessages.join(" and "),
          false
        )
      );
    }

    return error;
  }
};

export const handleRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    userSchema.parse(req.body);

    res.status(201).json({ message: "User registration successful" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => {
        return `${err.message}`;
      });

      return next(
        new AppError(
          "Invalid or missing email and password",
          400,
          errorMessages.join(" and "),
          false
        )
      );
    }
  }
};
