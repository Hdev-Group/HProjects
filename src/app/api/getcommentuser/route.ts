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

      try {
        // Fetch the user data from Clerk API
        const user = await clerkClient.users.getUser(id);
        // Cache the user data with desired fields
        const cachedUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          imageUrl: user.imageUrl
        };
        userCache.set(id, cachedUser);
        return cachedUser;
      } catch (error) {
        console.warn(`User with ID ${id} not found. Skipping this user.`);
        return null;
      }
    }));

    // Filter out null results
    const filteredUsers = users.filter(user => user !== null);

    return NextResponse.json(filteredUsers);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
  }
}
