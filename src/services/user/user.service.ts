import { UserLogin, UserRegister } from "../../shared/zod.schema";
import passport from "passport";
const bcrypt = require("bcrypt");
import { createNewUser, findUser } from "../../models/user.model";
import { NextFunction, Request } from "express";
import { AppError } from "../../shared/error";

export const loginService = async (userData: UserLogin) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err: Error, user: any, info: any) => {
      if (err) {
        reject(err);
      }

      if (user === false) {
        reject(info);
      }

      resolve(user);
    })({ body: userData });
  });
};

export const loginUserSession = (req: Request, user: any) => {
  return new Promise((resolve, reject) => {
    req.logIn(user, (loginErr: any) => {
      if (loginErr) {
        reject(loginErr);
      }
      resolve(user);
    });
  });
};

export const registerService = async (
  userData: UserRegister,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = userData;
  const userExists = await findUser(email);

  if (userExists) {
    return next(
      new AppError("Duplicate User", 409, "User Already Exists", false)
    );
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const userPayload: UserRegister = {
    firstName,
    lastName,
    email,
    password: passwordHash,
  };

  const newUser = await createNewUser(userPayload);

  return { success: true, user: newUser };
};
