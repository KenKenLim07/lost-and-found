import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { supabase } from '../lib/supabase';

function getCurrentWeekStart() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday...
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust to Monday
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0]; // 'YYYY-MM-DD'
}

export default function Banner() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      const { data, error } = await supabase
        .from('weekly_winners')
        .select('name')
        .eq('week_start', getCurrentWeekStart())
        .order('created_at', { ascending: true })
        .limit(2);

      if (!error && data) {
        setWinners(data);
      }
    };

    fetchWinners();

    // Subscribe to changes
    const subscription = supabase
      .channel('weekly_winners_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'weekly_winners' 
        }, 
        () => {
          fetchWinners();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-4 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <Gift className="w-5 h-5" />
        <p className="text-sm font-medium">
          {winners.length === 0 ? (
            "First two posters this week win ₱50 and a shoutout!"
          ) : winners.length === 1 ? (
            `Congratulations ${winners[0].name}! One more spot left for ₱50 and a shoutout!`
          ) : (
            `Congratulations ${winners[0].name} and ${winners[1].name}! You've won ₱50 and a shoutout!`
          )}
        </p>
      </div>
    </motion.div>
  );
} 