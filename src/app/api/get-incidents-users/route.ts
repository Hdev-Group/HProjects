import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Create a cache object to store the user data
const userCache = new Map<string, any>();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userIds = searchParams.get("userIds")?.split(',');

  if (!userIds) {
    return NextResponse.json({ error: "Invalid userIds" }, { status: 400 });
  }

  try {
    const users = await Promise.all(userIds.map(async (id) => {
      // Check if the user data is already cached
      if (userCache.has(id)) {
        return userCache.get(id);
      }

      try {
        // Fetch the user data from Clerk API
        const user = await clerkClient.users.getUser(id);
        
        // Filter the user data to return only the desired fields
        const filteredUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          imageUrl: user.imageUrl
        };

        // Cache the filtered user data
        userCache.set(id, filteredUser);
        
        // Return the filtered user data
        return filteredUser;
      } catch (error) {
        console.warn(`User with ID ${id} not found. Skipping this user.`);
        // Return null or some indication that the user wasn't found
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
