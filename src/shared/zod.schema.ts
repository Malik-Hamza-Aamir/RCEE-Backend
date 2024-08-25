import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type UserLogin = z.infer<typeof userSchema>;

export const userRegisterSchema = z.object({
  
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string(),
  image: z.string().optional(),
});

export type UserRegister = z.infer<typeof userRegisterSchema>;