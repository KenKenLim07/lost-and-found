import { motion } from 'framer-motion';
import { Megaphone, Coins } from 'lucide-react';
import { useWinners } from '../context/WinnersContext';
import clsx from 'clsx';
import { getRewardMessage } from '../utils/rewardMessages.jsx';

export default function WeeklyRewardBanner() {
  const { winners, isLoading } = useWinners();

  const bannerClass = clsx(
    "bg-cyan-600 text-white py-2.5 px-4 shadow-sm transition-opacity duration-200",
    {
      'opacity-0': isLoading,
      'opacity-100': !isLoading,
    }
  );

  return (
    <motion.div 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={bannerClass}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Megaphone className="w-6 h-6 text-yellow-200 shrink-0" />
        <p
          className="text-sm font-medium text-center flex-1 mx-4"
          role="region"
          aria-live="polite"
          aria-label="Weekly reward announcement"
        >
          {getRewardMessage(winners)}
        </p>
        <div className="flex items-center space-x-2">
          <Coins className="w-6 h-6 text-yellow-200 shrink-0" />
        </div>
      </div>
    </motion.div>
  );
}
