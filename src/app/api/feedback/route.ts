import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../../convex/_generated/api';
import { fetchMutation } from "convex/nextjs";


export async function POST(request: NextRequest) {
    // rate limiting 3 requests per 2 seconds
    const rateLimit = require('express-rate-limit');
    const limiter = rateLimit({
        windowMs: 2000,
        max: 3
    });
    // Apply the rate limiter to the request
    limiter(request, NextResponse);
    try {
        console.log('Request received:', request);
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

// testing curl cmd curl -X POST http://localhost:3000/api/feedback -H "Content-Type: application/json" -d "{\"projectId\":\"j5798g6sntj6y5trs7ecrxtzad6w8sy1\",\"feedback\":\"You should add a pinned message\",\"title\":\"Pinned Message Feature\",\"name\":\"James Blackhurst\",\"email\":\"test@example.com\",\"label\":\"featureRequest\"}"
