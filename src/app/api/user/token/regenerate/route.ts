import { NextRequest, NextResponse } from "next/server";
import { updateApiToken } from "@/lib/utils";
import { getUserIdFromSession } from "@/lib/auth-utils";

export const config = {
  runtime: "edge",
};

export async function POST(req: NextRequest) {
  try {
    const { error, userId } = await getUserIdFromSession(req);
    
    if (error) {
      return error;
    }

    const token = await updateApiToken(userId!);

    return NextResponse.json({ 
      success: true, 
      token,
      bearerToken: `Bearer ${token}`,
      message: "Your API token has been regenerated successfully. Use it with the Authorization header (Bearer token)."
    });
  } catch (error) {
    console.error("Error regenerating API token:", error);
    return NextResponse.json(
      { error: "An error occurred while regenerating API token" },
      { status: 500 }
    );
  }
} 