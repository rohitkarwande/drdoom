import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const scoreData = req.body;
      const data = await redis.get('leaderboard');
      let currentBoard: any = data ? JSON.parse(data) : [];
      
      if (!Array.isArray(currentBoard)) {
        currentBoard = [];
      }
      
      currentBoard.push({
        ...scoreData,
        id: Date.now().toString(),
        date: new Date().toISOString()
      });
      
      // Sort by score descending, then by time remaining descending, then by strikes ascending
      currentBoard.sort((a: any, b: any) => {
        if (b.finalScore !== a.finalScore) return b.finalScore - a.finalScore;
        if (b.remainingTime !== a.remainingTime) return b.remainingTime - a.remainingTime;
        return a.strikes - b.strikes;
      });
      
      await redis.set('leaderboard', JSON.stringify(currentBoard));
      
      return res.status(200).json({ success: true, leaderboard: currentBoard });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to save score' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
