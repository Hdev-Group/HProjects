import { NextApiRequest, NextApiResponse } from 'next';
import { clerkClient } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid userId parameter' });
    }

    try {
        const user = await clerkClient.users.getUser(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const imageUrl = user.imageUrl;

        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}