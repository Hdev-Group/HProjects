import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userIds = searchParams.get("userIds");


  if (!userIds) {
    return NextResponse.json({ error: "Invalid userIds" }, { status: 400 });
  }

  const userIdArray = userIds.split(',');

  try {
    const users = await Promise.all(userIdArray.map(id => clerkClient.users.getUser(id)));
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
  }
}