import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/error";
import { userSchema } from "../../shared/zod.schema";
import { z } from "zod";
import {
  loginService,
  registerService,
  loginUserSession,
} from "../../services/user/user.service";

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginData = userSchema.parse(req.body);
    const user = await loginService(loginData);
    await loginUserSession(req, user);

    res.status(200).json({ message: "Login successful", user });
  } catch (error: any | unknown) {
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

    return next(new AppError(error.message, 401, error?.message, false));
  }
};

export const userRegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Must be 6 characters long")
    .regex(/[A-Z]/, "At least one uppercase letter required")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[@$!%*?&#]/, "Must contain at least one special character"),
  image: z.string().optional(),
});

export const handleRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registrationData = userRegisterSchema.parse(req.body);
    const registrationResult = await registerService(registrationData, next);

    if (registrationResult) {
      return res.status(201).json({
        id: registrationResult.user?.id,
        message: "User registered successfully",
        redirect: "/login",
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => `${err.message}`);
      return next(
        new AppError(
          "Invalid or missing values recieved",
          400,
          errorMessages[0],
          false
        )
      );
    }
  }
};
