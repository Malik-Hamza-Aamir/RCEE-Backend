const express = require("express");
export const userRouter = express.Router();
import {
  handleRegistration,
  handleLogin,
} from "../controllers/user/user.rest.controller";

userRouter.route("/registration").post(handleRegistration);
userRouter.route("/login").post(handleLogin);
