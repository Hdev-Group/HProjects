import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Create a cache object to store the user data
const userCache = new Map<string, any>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userIds = searchParams.get("userIds");

  if (!userIds) {
    return NextResponse.json({ error: "Invalid userIds" }, { status: 400 });
  }

  const userIdArray = userIds.split(',');


  try {
    const users = await Promise.all(userIdArray.map(async (id) => {
      // Check if the user data is already cached
      if (userCache.has(id)) {
        return userCache.get(id);
      }

      // Fetch the user data from Clerk API
      const user = await clerkClient.users.getUser(id);
      // Cache the user data

      // Return only the desired fields
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        imageUrl: user.imageUrl
      };
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
  }
}