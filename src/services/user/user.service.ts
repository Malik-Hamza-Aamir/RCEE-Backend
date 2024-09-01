import { UserLogin, UserRegister } from "../../shared/zod.schema";
import passport from "passport";
const bcrypt = require("bcrypt");
import { createNewUser, findUser } from "../../models/user.model";
import { Request } from "express";

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

export const registerService = async (userData: UserRegister) => {
  const { firstname, lastname, email, password } = userData;
  const userExists = await findUser(email);

  if (userExists) {
    return { success: false, message: "User Already Exists" };
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const userPayload: UserRegister = {
      firstname,
      lastname,
      email,
      password: passwordHash,
    };

    const newUser = await createNewUser(userPayload);

    return { success: true, user: newUser };
  }
};
