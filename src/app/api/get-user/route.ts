import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";
import { getAuth } from '@clerk/nextjs/server';

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
  const userIda = searchParams.get("userId");

  // Ensure Clerk middleware is in place
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!userIda) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  // Check if user data is in cache
  if (cache.has(userIda)) {
    const cachedUser = cache.get(userIda);
    const { firstName, lastName, id, imageUrl } = cachedUser!.data;
    return NextResponse.json({ firstName, lastName, id, imageUrl });
  }

  try {
    const user = await clerkClient.users.getUser(userIda);

    // Store user data in cache
    cache.set(userIda, { userId: userIda, data: user });

    const { firstName, lastName, id, imageUrl } = user;
    return NextResponse.json({ firstName, lastName, id, imageUrl });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
  }
}
