import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyApiToken } from "@/lib/utils";
import { getUserIdFromSession } from "@/lib/auth-utils";

export async function GET(req: NextRequest) {
  try {
    const { error, userId } = await getUserIdFromSession(req);
    
    if (error) {
      return error;
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      );
    }

    const reports = await prisma.testReport.findMany({
      where: { userId: userId! },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        startTime: true,
        endTime: true,
        duration: true,
        authorName: true,
        authorEmail: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({ reports });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching test reports" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization bearer token is required" },
        { status: 401 }
      );
    }

    const apiToken = authHeader.substring(7);
    console.log("apiToken", apiToken);

    const tokenData = await verifyApiToken(apiToken);
    
    if (!tokenData) {
      return NextResponse.json(
        { error: "Invalid API token" },
        { status: 401 }
      );
    }

    const testData = await req.json();
    
    if (!testData.name || !testData.status) {
      return NextResponse.json(
        { error: "Missing required fields: name and status are required" },
        { status: 400 }
      );
    }

    const startTime = testData.startTime 
      ? new Date(typeof testData.startTime === 'number' ? testData.startTime : Number(testData.startTime)) 
      : new Date();
      
    const endTime = testData.endTime 
      ? new Date(typeof testData.endTime === 'number' ? testData.endTime : Number(testData.endTime)) 
      : new Date();

    const duration = testData.duration || (endTime.getTime() - startTime.getTime());

    let screenshots = null;
    if (testData.steps && Array.isArray(testData.steps)) {
      const screenshotSteps = testData.steps.filter((step: any) => step.screenshot);
      if (screenshotSteps.length > 0) {
        screenshots = JSON.stringify(
          screenshotSteps.map((step: any) => ({ 
            name: step.name,
            status: step.status,
            timestamp: step.timestamp,
            screenshot: step.screenshot
          }))
        );
      }
    }

    const test = await prisma.testReport.create({
      data: {
        userId: tokenData.userId,
        name: testData.name,
        description: testData.description,
        status: testData.status,
        startTime,
        endTime,
        duration,
        authorName: testData.tester?.author || "",
        authorEmail: testData.tester?.email || "",
        environment: testData.environment ? JSON.stringify(testData.environment) : "{}",
        steps: testData.steps ? JSON.stringify(testData.steps) : "[]",
        screenshots,
        rawData: JSON.stringify(testData)
      }
    });

    return NextResponse.json({ 
      success: true, 
      testId: test.id,
      message: "Test report created successfully" 
    }, { status: 201 });
  } catch (error) {
    console.error("Error submitting test:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
} 