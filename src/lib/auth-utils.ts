import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function checkAuth(req: NextRequest) {
  const session = await auth();
  
  if (!session || !session.user.id) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
      session: null
    };
  }
  
  return {
    error: null,
    session
  };
}


export async function getUserIdFromSession(req: NextRequest) {
  const { error, session } = await checkAuth(req);
  
  if (error) {
    return { error, userId: null };
  }
  
  return { error: null, userId: session!.user.id };
} 