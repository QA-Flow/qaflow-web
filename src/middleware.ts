import { NextResponse } from "next/server";
import { auth } from "./auth";
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/lib/routes";
import { getToken } from "next-auth/jwt";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("TOKEN: ", token);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some(route => 
    nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  const isApiRoute = nextUrl.pathname.startsWith("/api") && !isApiAuthRoute;

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return;
  }

  if ((isDashboardRoute || isApiRoute) && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname);
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};