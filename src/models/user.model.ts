import { db } from "../shared/db";
import { AppError } from "../shared/error";
import { UserLogin, UserRegister } from "../shared/zod.schema";

export const createNewUser = async (userData: UserRegister) => {
  try {
    return await db.user.create({
      data: userData,
      select: {
        id: true,
      },
    });
  } catch (error) {
    throw new AppError(
      "user creation",
      500,
      "Error Occured while creating new user",
      false
    );
  }
};

export const getUser = async (body: UserLogin) => {
  try {
    const { email, password } = body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {}
};


export const findUser = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: {
        email,
      },
    });

  } catch (error) {
    throw new AppError(
      "Finding User",
      500,
      "Error Occured while finding user",
      false
    );
  }
}