import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse, NextRequest  } from "next/server";
import { LRUCache } from "lru-cache";
import { getAuth } from '@clerk/nextjs/server';

interface CacheEntry {
  userId: string;
  data: any; 
}

// Create a new LRU cache instance
const cache = new LRUCache<string, CacheEntry>({
  max: 500, // maximum number of items in cache
  maxAge: 1000 * 60 * 5, // items will be removed after 5 minutes
} as any);

export async function GET(request: NextRequest) {
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
    const { firstName, lastName, id, imageUrl, emailAddresses } = cachedUser!.data;
    return NextResponse.json({ firstName, lastName, id, imageUrl, emailAddresses });
  }

  try {
    const user = await clerkClient.users.getUser(userIda);

    // Store user data in cache
    cache.set(userIda, { userId: userIda, data: user });

    const { firstName, lastName, id, imageUrl, emailAddresses } = user;
    return NextResponse.json({ firstName, lastName, id, imageUrl, emailAddresses });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
  }
}
