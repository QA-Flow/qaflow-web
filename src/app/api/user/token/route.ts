import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateApiToken } from "@/lib/utils";
import { getUserIdFromSession } from "@/lib/auth-utils";

export async function GET(req: NextRequest) {
  try {
    const { error, userId } = await getUserIdFromSession(req);
    
    if (error) {
      return error;
    }

    
    const apiToken = await prisma.apiToken.findFirst({
      where: { userId: userId! }
    });

    
    if (!apiToken) {
      const token = await generateApiToken(userId!);
      return NextResponse.json({ 
        token,
        bearerToken: `Bearer ${token}`
      });
    }

    return NextResponse.json({ 
      token: apiToken.token,
      bearerToken: `Bearer ${apiToken.token}`
    });
  } catch (error) {
    console.error("Error fetching API token:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching API token" },
      { status: 500 }
    );
  }
} 