import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {LRUCache} from "lru-cache";

// Define the type for your cache entries
interface CacheEntry {
  userId: string;
  data: any; // Adjust this based on the actual structure of user data
}

// Create a new LRU cache instance
const cache = new LRUCache<string, CacheEntry>({
  max: 500, // maximum number of items in cache
  maxAge: 1000 * 60 * 5, // items will be removed after 5 minutes
} as any);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  // Check if user data is in cache
  if (cache.has(userId)) {
    const cachedUser = cache.get(userId);
    const { firstName, lastName, id, imageUrl } = cachedUser.data;
    return NextResponse.json({ firstName, lastName, id, imageUrl }); // Return selected data
  }

  try {
    const user = await clerkClient.users.getUser(userId);

    // Store user data in cache
    cache.set(userId, { userId, data: user });

    const { firstName, lastName, id, imageUrl } = user;
    return NextResponse.json({ firstName, lastName, id, imageUrl });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
  }
}
