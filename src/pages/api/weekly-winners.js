import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { userId, weekStart } = req.body;

      // Get count of posts this week
      const postCount = await prisma.post.count({
        where: {
          createdAt: {
            gte: new Date(weekStart),
          },
        },
      });

      // Check if user is among first two posters
      const isWinner = postCount < 2;

      if (isWinner) {
        // Create or update winner entry
        await prisma.weeklyWinner.create({
          data: {
            userId,
            weekStart: new Date(weekStart),
          },
        });
      }

      res.status(200).json({ isWinner });
    } catch (error) {
      console.error('Error processing winner:', error);
      res.status(500).json({ error: 'Error processing winner' });
    }
  } else if (req.method === 'GET') {
    try {
      const { weekStart } = req.query;

      // Get winners for the current week
      const winners = await prisma.weeklyWinner.findMany({
        where: {
          weekStart: new Date(weekStart),
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
        take: 2,
      });

      res.status(200).json({ winners });
    } catch (error) {
      console.error('Error fetching winners:', error);
      res.status(500).json({ error: 'Error fetching winners' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 