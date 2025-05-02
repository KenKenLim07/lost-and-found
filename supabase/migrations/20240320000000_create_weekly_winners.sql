-- Create weekly_winners table
CREATE TABLE weekly_winners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  week_start DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, week_start)
);

-- Create index for faster queries
CREATE INDEX weekly_winners_week_start_idx ON weekly_winners(week_start);

-- Enable Row Level Security
ALTER TABLE weekly_winners ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all weekly winners"
  ON weekly_winners FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own weekly winner entry"
  ON weekly_winners FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own weekly winner entry"
  ON weekly_winners FOR UPDATE
  USING (auth.uid() = user_id); 