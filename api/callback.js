import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv(); // Automatically reads your Vercel/Upstash variables

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { accessToken, requestId } = req.body;
    if (!accessToken || !requestId) {
        return res.status(400).json({ error: 'accessToken and requestId are required' });
    }

    try {
        const profileRes = await fetch('https://api4.truecaller.com/v1/profile', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        if (!profileRes.ok) {
            return res.status(profileRes.status).json({ error: 'Failed to fetch Truecaller profile' });
        }
        const profile = await profileRes.json();

        // Store profile with the requestId as the key for 5 minutes
        await redis.set(`tc_session:${requestId}`, profile, { ex: 300 });

        return res.status(200).send("Success");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}