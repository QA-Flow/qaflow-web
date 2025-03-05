import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/auth-utils";

export async function GET(req: NextRequest) {
  try {
    const { error, userId } = await getUserIdFromSession(req);
    
    if (error) {
      return error;
    }

    const totalTests = await prisma.testReport.count({
      where: { userId: userId! }
    });

    const passedTests = await prisma.testReport.count({
      where: { 
        userId: userId!,
        status: "passed"
      }
    });

    const failedTests = await prisma.testReport.count({
      where: { 
        userId: userId!,
        status: "failed"
      }
    });

    const apiKeys = await prisma.apiToken.count({
      where: { userId: userId! }
    });

    return NextResponse.json({
      stats: {
        totalTests,
        passedTests,
        failedTests,
        apiKeys
      }
    });
  } catch (_) {
    console.error("Error fetching dashboard stats:", _);
    return NextResponse.json(
      { error: "An error occurred while fetching dashboard stats" },
      { status: 500 }
    );
  }
} 