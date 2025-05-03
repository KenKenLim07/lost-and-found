import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const WinnersContext = createContext();

export function WinnersProvider({ children }) {
  const [winners, setWinners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWinners = useCallback(async () => {
    try {
      console.log('Fetching winners...');
      setIsLoading(true);
      const { data: firstPosts, error: firstPostsError } = await supabase
        .from('weekly_winners')
        .select('id, name, created_at, user_id, position')
        .eq('week_start', getCurrentWeekStart())
        .order('position', { ascending: true });

      if (firstPostsError) {
        console.error('Error fetching first posts:', firstPostsError);
        return;
      }

      console.log('Fetched posts:', firstPosts);

      // Filter to get only the first post per user
      const uniqueUserPosts = firstPosts.reduce((acc, post) => {
        if (!acc.some(p => p.user_id === post.user_id)) {
          acc.push(post);
        }
        return acc;
      }, []);

      // Take only the first two unique users
      const topTwoWinners = uniqueUserPosts.slice(0, 2);
      console.log('Setting winners:', topTwoWinners);
      setWinners(topTwoWinners);
    } catch (error) {
      console.error('Error in fetchWinners:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Optimistically update winners list
  const updateWinnersList = useCallback((newWinner) => {
    console.log('Updating winners list with:', newWinner);
    setWinners(prevWinners => {
      // Check if user already exists in winners list
      const userExists = prevWinners.some(winner => winner.user_id === newWinner.user_id);
      if (userExists) {
        console.log('User already exists in winners list');
        return prevWinners;
      }

      // Add new winner and sort by position
      const updatedWinners = [...prevWinners, newWinner].sort((a, b) => a.position - b.position);
      console.log('Updated winners list:', updatedWinners);
      return updatedWinners.slice(0, 2); // Keep only top 2
    });
  }, []);

  useEffect(() => {
    console.log('Setting up winners context...');
    let mounted = true;

    const setupSubscription = async () => {
      // Fetch initial data
      if (mounted) {
        await fetchWinners();
      }

      // Subscribe to changes
      const channel = supabase.channel('weekly_winners_changes');
      
      const subscription = channel
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'weekly_winners'
          }, 
          (payload) => {
            console.log('Received real-time update:', payload);
            if (payload.eventType === 'INSERT' && mounted) {
              console.log('Processing INSERT event');
              // Optimistically update the UI
              updateWinnersList(payload.new);
              // Fetch fresh data to ensure consistency
              fetchWinners();
            }
          }
        )
        .subscribe((status) => {
          console.log('Subscription status:', status);
        });

      return () => {
        console.log('Cleaning up subscription...');
        subscription.unsubscribe();
      };
    };

    setupSubscription();

    return () => {
      mounted = false;
    };
  }, [fetchWinners, updateWinnersList]);

  const addWinner = async (winner) => {
    try {
      console.log('Adding winner:', winner);
      // Check if user already has a post this week
      const { data: existingPosts, error: checkError } = await supabase
        .from('weekly_winners')
        .select('id')
        .eq('week_start', getCurrentWeekStart())
        .eq('user_id', winner.user_id)
        .limit(1);

      if (checkError) {
        console.error('Error checking existing posts:', checkError);
        return false;
      }

      // If user already has a post this week, don't add another one
      if (existingPosts && existingPosts.length > 0) {
        console.log('User already has a post this week');
        return false;
      }

      // Add the new winner
      const { data: newWinner, error: insertError } = await supabase
        .from('weekly_winners')
        .insert([{
          ...winner,
          week_start: getCurrentWeekStart()
        }])
        .select()
        .single();

      if (insertError) {
        console.error('Error adding winner:', insertError);
        return false;
      }

      console.log('Successfully added winner:', newWinner);

      // Immediately update the UI with the new winner
      if (newWinner) {
        updateWinnersList(newWinner);
        // Also fetch fresh data to ensure consistency
        await fetchWinners();
      }

      return true;
    } catch (error) {
      console.error('Error in addWinner:', error);
      return false;
    }
  };

  return (
    <WinnersContext.Provider value={{ winners, addWinner, isLoading, fetchWinners }}>
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