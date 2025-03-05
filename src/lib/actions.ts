"use server";
import { SignInValues, SignUpValues, signUpSchema } from "@/lib/form-schemas";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthError } from "next-auth";
import { hashSync } from "bcryptjs";
import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { generateApiToken } from "@/lib/utils";
import { sendWelcomeEmailWithTemplate } from "./sendgrid";

export const signInAction = async (signInValues: SignInValues) => {
  try {
    await signIn("credentials", {
      ...signInValues,
      redirect: false
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Invalid credentials" };
    }
    return { success: false, error: "Something went wrong" };
  }
};

export const signUpAction = async (signUpValues: SignUpValues) => {
  const { data } = await signUpSchema.safeParseAsync(signUpValues);
  if (!data) return { error: "Invalid data" };
  try {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashSync(data.password, 10),
      },
    });

    await generateApiToken(user.id);

    await sendWelcomeEmailWithTemplate(user.username, user.email);

    return { success: true };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          return { success: false, error: "Email already exists" };
        default:
          return { success: false, error: "An error occurred: " + error.message };
      }
    }
    return { success: false, error: "An error occurred: " + (error instanceof Error ? error.message : String(error)) };
  }
};