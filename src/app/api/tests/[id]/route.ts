import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/auth-utils";

export const config = {
  runtime: "edge",
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
    const { error, userId } = await getUserIdFromSession(req);
    
    if (error) {
      return error;
    }

    const report = await prisma.testReport.findUnique({
      where: {
        id: id,
        userId: userId!
      }
    });

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    const environment = report.environment ? JSON.parse(report.environment) : {};
    const steps = report.steps ? JSON.parse(report.steps) : [];
    const screenshots = report.screenshots ? JSON.parse(report.screenshots) : [];
    const rawData = report.rawData ? JSON.parse(report.rawData) : {};

    const formattedReport = {
      id: report.id,
      testCaseName: report.name,
      description: report.description || rawData.description,
      status: report.status,
      startTime: report.startTime,
      endTime: report.endTime,
      duration: report.duration || (report.endTime.getTime() - report.startTime.getTime()),
      authorName: report.authorName,
      authorEmail: report.authorEmail,
      
      tester: (report.authorName || report.authorEmail) ? {
        author: report.authorName || "",
        email: report.authorEmail || ""
      } : null,
      
      environment,
      
      steps: steps.map((step: any) => {
        if (screenshots && screenshots.length > 0) {
          const screenshotData = screenshots.find((s: any) => 
            s.name === step.name && s.timestamp === step.timestamp
          );
          if (screenshotData && screenshotData.screenshot) {
            step.screenshot = screenshotData.screenshot;
          }
        }
        return step;
      }),
      
      createdAt: report.createdAt
    };

    return NextResponse.json({
      report: formattedReport
    });
  } catch (error) {
    console.error("Error fetching test report:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the test report" },
      { status: 500 }
    );
  }
} 