import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import confetti from 'canvas-confetti';
import { useWinners } from '../context/WinnersContext';

function getCurrentWeekStart() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday...
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust to Monday
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0]; // 'YYYY-MM-DD'
}

export default function WinnerPromptModal({ isOpen, onClose, userId, position }) {
  const [formData, setFormData] = useState({
    completeName: '',
    year: '',
    section: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { addWinner, winners, fetchWinners } = useWinners();

  useEffect(() => {
    if (isOpen) {
      // Reset form state when modal opens
      setFormData({
        completeName: '',
        year: '',
        section: ''
      });
      setSubmitError(null);
      
      // Trigger confetti when modal opens
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous errors when user starts typing
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async () => {
    if (!formData.completeName.trim() || !formData.year.trim() || !formData.section.trim()) {
      setSubmitError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const winnerName = `${formData.completeName} (${formData.year}-${formData.section})`;
      console.log('Submitting winner:', { name: winnerName, userId, position });
      
      // Add the new winner
      const { data: newWinner, error: insertError } = await supabase
        .from('weekly_winners')
        .insert({
          name: winnerName,
          user_id: userId,
          position: position,
          week_start: getCurrentWeekStart()
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error inserting winner:', insertError);
        throw insertError;
      }

      console.log('Successfully inserted winner:', newWinner);
      
      // Force a refresh of the winners list
      await fetchWinners();
      
      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error('Error submitting winner name:', error);
      setSubmitError(error.message || 'Failed to submit name. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl"
          >
            <h3 className="text-lg font-semibold mb-4">Congratulations! 🎉</h3>
            <p className="text-gray-600 mb-4">
              You're one of the first two posters this week! Enter your details to claim your ₱50 reward and shoutout.
            </p>
            
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {submitError}
              </div>
            )}

            <div className="space-y-4">
              <input
                type="text"
                name="completeName"
                value={formData.completeName}
                onChange={handleInputChange}
                placeholder="Enter your complete name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="Enter your year (e.g., 1st, 2nd, 3rd, 4th)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                placeholder="Enter your section"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                disabled={isSubmitting}
              >
                Skip
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.completeName.trim() || !formData.year.trim() || !formData.section.trim() || isSubmitting}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 