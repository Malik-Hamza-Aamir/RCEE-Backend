// for executing business logic and db logic
import { UserLogin, UserRegister } from "../../shared/zod.schema";
import passport from "passport";
import { db } from "../../shared/db";
const bcrypt = require("bcrypt");
import { createNewUser, findUser } from "../../models/user.model";

export const loginService = (userData: UserLogin) => {
  // from models find the user get the user here
  // then use bycrypt to compare the password here
  // use the passport js local strategy here
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
