import { motion } from 'framer-motion';
import { Gift, Megaphone } from 'lucide-react';
import { useWinners } from '../context/WinnersContext';

// Highlighted name component with subtle animation
const HighlightedName = ({ name }) => (
  <motion.span
    initial={{ opacity: 0.8 }}
    animate={{ opacity: 1 }}
    className="inline-block px-1.5 py-0.5 bg-cyan-300/20 rounded-md font-semibold tracking-wide"
  >
    {name}
  </motion.span>
);

export default function WeeklyRewardBanner() {
  const { winners, isLoading } = useWinners();

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`bg-cyan-600 text-white py-2.5 px-4 shadow-sm transition-opacity duration-200 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Megaphone className="w-4 h-4 text-cyan-200" />
        <p className="text-sm font-medium text-center flex-1 mx-4">
          {winners.length === 0 ? (
            "First two posters this week win ₱50 and a shoutout!"
          ) : winners.length === 1 ? (
            <>
              Shoutout to <HighlightedName name={winners[0].name} />! You've won ₱50! I'll contact you about claiming your reward.
            </>
          ) : (
            <>
              Shoutout to <HighlightedName name={winners[0].name} /> and <HighlightedName name={winners[1].name} />! Each of you has won ₱50! I'll contact you about claiming your rewards.
            </>
          )}
        </p>
        <Gift className="w-4 h-4 text-cyan-200" />
      </div>
    </motion.div>
  );
} 