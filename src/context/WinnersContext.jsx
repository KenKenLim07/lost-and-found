import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const WinnersContext = createContext();

export function WinnersProvider({ children }) {
  const [winners, setWinners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWinners = async () => {
    try {
      const { data, error } = await supabase
        .from('weekly_winners')
        .select('name, created_at')
        .eq('week_start', getCurrentWeekStart())
        .order('created_at', { ascending: true })
        .limit(2);

      if (!error && data) {
        setWinners(data);
      }
    } catch (error) {
      console.error('Error fetching winners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data
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

  const addWinner = (winner) => {
    setWinners(prev => {
      const newWinners = [...prev, winner];
      return newWinners.sort((a, b) => a.created_at - b.created_at).slice(0, 2);
    });
  };

  return (
    <WinnersContext.Provider value={{ winners, addWinner, isLoading }}>
      {children}
    </WinnersContext.Provider>
  );
}

export function useWinners() {
  const context = useContext(WinnersContext);
  if (!context) {
    throw new Error('useWinners must be used within a WinnersProvider');
  }
  return context;
}

function getCurrentWeekStart() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday...
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust to Monday
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0]; // 'YYYY-MM-DD'
} 