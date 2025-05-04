import React from 'react';
import HighlightedName from '../components/HighlightedName';

export const REWARD_AMOUNT = 50;

export function getRewardMessage(winners) {
  const topWinners = winners.slice(0, 2);

  if (topWinners.length === 0) {
    return (
      <>
        🚨 <strong>Weekly Reward:</strong> Be one of the first <strong>2 posters</strong> this week to win <strong>₱{REWARD_AMOUNT}</strong> and get a shoutout!
        <br />
        <span className="text-xs text-white/80">(This event resets every Monday.)</span>
      </>
    );
  }


  if (topWinners.length === 1) {
    return (
      <>
        

        <strong className=""> Shout out to 🥳 <HighlightedName name={topWinners[0].name} />!</strong> You've won ₱{REWARD_AMOUNT}! I'll reach out to help you claim your reward.
        <br />
        <span className="text-grey-200"> One slot left! Post now to win🎁 ₱{REWARD_AMOUNT}!</span>
      </>
    );
  }

  return (
    <>
      <strong className=""> Shout out to 🥳 <HighlightedName name={topWinners[0].name} /> and 🥳 <HighlightedName name={topWinners[1].name} />!</strong> Each of you has won🎁 ₱{REWARD_AMOUNT}! I'll contact you about claiming your rewards.
      <br />
      <span className="text-xs text-white/80">🕒 New round starts Monday. Stay sharp!</span>
    </>
  );
}