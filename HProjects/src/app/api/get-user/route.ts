import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  console.log("Received userId:", userId);

  if (!userId) {
    console.log("Invalid userId");
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    console.log("User data fetched successfully");
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
  }
}