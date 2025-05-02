import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, weekStart } = req.body;

      // Update the most recent winner without a name
      const winner = await prisma.weeklyWinner.findFirst({
        where: {
          weekStart: new Date(weekStart),
          name: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (winner) {
        await prisma.weeklyWinner.update({
          where: { id: winner.id },
          data: { name },
        });
      }

      // Get updated winners list
      const winners = await prisma.weeklyWinner.findMany({
        where: {
          weekStart: new Date(weekStart),
        },
        orderBy: {
          createdAt: 'asc',
        },
        take: 2,
      });

      res.status(200).json({ winners });
    } catch (error) {
      console.error('Error updating winner name:', error);
      res.status(500).json({ error: 'Error updating winner name' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 