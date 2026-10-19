-- Create waitlist table for Fuga landing page
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  email text NOT NULL UNIQUE,
  telefono text,
  zona text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS (but allow anonymous inserts for the landing page)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: allow anyone to insert (public waitlist signup)
CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: only authenticated users can read (for admin)
CREATE POLICY "Allow authenticated reads" ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);
