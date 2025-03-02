"use server";
import { SignInValues, SignUpValues, signUpSchema } from "@/lib/form-schemas";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthError } from "next-auth";
import { hashSync } from "bcryptjs";
import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import { generateApiToken } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "./routes";

export const signInAction = async (signInValues: SignInValues) => {
  try {
    await signIn("credentials", {
      ...signInValues,
      redirect: false
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "An error occurred: " + error.message };
      }
    }
    throw error;
  }
  redirect(DEFAULT_LOGIN_REDIRECT);
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
    
    return { success: true };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          return { error: "Email already exists" };
        default:
          return { error: "An error occurred: " + error.message };
      }
    }
    return { error: "An error occurred: " + (error instanceof Error ? error.message : String(error)) };
  }
};