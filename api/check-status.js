import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
    const { requestId } = req.query;

    const profile = await redis.get(`tc_session:${requestId}`);

    if (profile) {
        // Once found, we return it and delete it from storage
        await redis.del(`tc_session:${requestId}`);
        return res.status(200).json({ profile });
    }

    return res.status(200).json({ status: "pending" });
}