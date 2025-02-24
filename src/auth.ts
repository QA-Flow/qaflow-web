import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { signInSchema } from "@/lib/form-schemas";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";

export const { auth, signIn, signOut, handlers } = NextAuth({ 
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Credentials({
          async authorize(credentials) {
            // Validate the fields
            const validatedFields = signInSchema.safeParse(credentials);
            if (!validatedFields.success) {
              return null;
            }
    
            // Validate that the user exists
            const { email, password } = validatedFields.data;
            const user = await prisma.user.findUnique({
              where: { email },
            });
            if (!user) {
              return null;
            }
    
            // Check the password
            const isPasswordMatch = await compare(password, user.password);
            if (!isPasswordMatch) {
              return null;
            }
    
            return user;
          },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user && user.email) {
          const existingUser = await prisma.user.findFirst({
            where: { email: user.email },
          });
  
          if (existingUser) {
            token.id = existingUser.id;
            token.email = existingUser.email;
          }
        }
  
        return token;
      },
      async session({ session, token }) {
        if (token?.id) {
          session.user.id = token.id;
          session.user.email = token.email;
        }
  
        return session;
      },
    },
});
