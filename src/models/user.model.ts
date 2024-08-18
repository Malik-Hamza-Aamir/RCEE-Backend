import { db } from "../shared/db";
import { UserLogin } from "../shared/zod.schema";

export const createNewUser = async () => {};

export const getUser = async (body: UserLogin) => {
  try {
    const { email, password } = body;
    const user = await db.user.findUnique({
        where: {
            email
        }
    });

    

  } catch (error) {}
};
