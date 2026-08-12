import { kv } from '@vercel/kv';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const leaderboard = await kv.get('leaderboard');
      return res.status(200).json(leaderboard || []);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
