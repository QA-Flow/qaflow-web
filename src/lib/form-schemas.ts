import * as z from "zod";
const { object, string, boolean } = z;

export const signInSchema = object({
  email: string({ required_error: "Email is required" }).email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = object({
  username: string({ required_error: "Username is required" })
    .min(4, "Username is required")
    .max(32, "Username must be less than 32 characters"),
  email: string({ required_error: "Email is required" }).email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string(),
  terms: boolean({ required_error: "You must agree to the terms" }),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
})
.refine((data) => data.terms === true, {
  path: ["terms"],
  message: "You must agree to the terms",
});
export type SignUpValues = z.infer<typeof signUpSchema>;