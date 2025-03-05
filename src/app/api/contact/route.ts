import { NextResponse } from "next/server";
import { sendContactEmailWithTemplate } from "@/lib/sendgrid";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message fields are required." },
        { status: 400 }
      );
    }

    await sendContactEmailWithTemplate(name, email, subject, message);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while sending the email" },
      { status: 500 }
    );
  }
} 