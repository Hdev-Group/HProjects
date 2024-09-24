import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../../convex/_generated/api';
import { fetchMutation } from "convex/nextjs";

// In-memory store for rate limits
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

// Custom rate limiter function
function rateLimit(request: NextRequest, limit: number, windowMs: number) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    if (!rateLimitStore.has(ip)) {
        rateLimitStore.set(ip, { count: 1, timestamp: now });
    } else {
        const rateData = rateLimitStore.get(ip)!;
        const timePassed = now - rateData.timestamp;

        if (timePassed > windowMs) {
            // Reset the window
            rateLimitStore.set(ip, { count: 1, timestamp: now });
        } else {
            // Increase the count and check the limit
            rateData.count += 1;
            if (rateData.count > limit) {
                return false; // Rate limit exceeded
            }
        }
    }
    return true; // Allowed request
}

// Apply custom rate limiter
export async function POST(request: NextRequest) {
    const limit = 3;
    const windowMs = 2000; // 2 seconds

    if (!rateLimit(request, limit, windowMs)) {
        return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 });
    }

    try {
        // Parse the incoming JSON data from the request body
        const { projectId, feedback, email, name, label, title } = await request.json();

        // Validate required fields
        if (!projectId) return createErrorResponse('Missing projectId.');
        if (!feedback) return createErrorResponse('Missing feedback.');

        // Define the allowed values for the label field
        const allowedLabels = ["idea", "issue", "question", "complaint", "featureRequest", "other"];

        // Validate label or set default
        const validLabel = allowedLabels.includes(label) ? label : 'featureRequest';

        // Feedback data object
        const feedbackData = {
            projectid: projectId as string,
            title: title ? title as string : 'Feedback',
            feedback: feedback as string,
            email: email ? email as string : 'Null',
            name: name ? name as string : 'Null',
            label: validLabel as string,
            status: 'Needs Review',
        };

        // Placeholder for actual database save logic
        console.log('Feedback received:', feedbackData);

        await fetchMutation(api.feedback.add, feedbackData);

        // Return a success response
        return NextResponse.json({ message: 'Feedback submitted successfully.' }, { status: 200 });

    } catch (error) {
        console.error('Error handling request:', error);
        return createErrorResponse('Something went wrong.');
    }
}

// Helper function to create error responses
function createErrorResponse(message: string) {
    return NextResponse.json({ error: message }, { status: 400 });
}
