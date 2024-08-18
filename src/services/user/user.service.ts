// for executing business logic and db logic
import { UserLogin } from "../../shared/zod.schema";

export const LoginService = (userData: UserLogin) => {
  // from models find the user get the user here
  // then use bycrypt to compare the password here
  // use the passport js local strategy here
};