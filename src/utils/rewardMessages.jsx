import React from 'react';
import HighlightedName from '../components/HighlightedName';

export const REWARD_AMOUNT = 50;

export function getRewardMessage(winners) {
  const topWinners = winners.slice(0, 2);

  if (topWinners.length === 0) {
    return "First two posters this week win ₱50 and a shoutout!";
  }

  if (topWinners.length === 1) {
    return (
      <>
        Shoutout to <HighlightedName name={topWinners[0].name} />! You've won ₱{REWARD_AMOUNT}! I'll contact you about claiming your reward.
        <br />
        <span className="text-cyan-200">One slot left! Post now to win ₱{REWARD_AMOUNT}!</span>
      </>
    );
  }

  return (
    <>
      Shoutout to <HighlightedName name={topWinners[0].name} /> and <HighlightedName name={topWinners[1].name} />! Each of you has won ₱{REWARD_AMOUNT}! I'll contact you about claiming your rewards.
    </>
  );
} 