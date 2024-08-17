// controllers validate the input
// throws error if input is incorrect
// pass to service layer for either database query writing or any other operation
// if we only need to write in db then it can also be done here and skip the service layer
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../shared/error";

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const handleLogin = async (
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
  