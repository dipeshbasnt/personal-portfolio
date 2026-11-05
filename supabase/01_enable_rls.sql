-- Enable Row Level Security on all tables
-- Migration: 01_enable_rls.sql

-- Enable RLS on enquiries table
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create policy: Public users can read only public enquiries
-- (adjust based on whether you have a public/private column)
CREATE POLICY "Public can read public enquiries" ON enquiries
  FOR SELECT
  TO public
  USING (true);

-- Create policy: Admin can manage all enquiries
CREATE POLICY "Admin can manage all enquiries" ON enquiries
  FOR ALL
  TO authenticated
  USING (
    auth.uid()::text = current_setting('app.admin_user_id', true)
    AND (auth.jwt() ->> 'role') = 'admin'
  )
  WITH CHECK (
    auth.uid()::text = current_setting('app.admin_user_id', true)
    AND (auth.jwt() ->> 'role') = 'admin'
  );

-- Create policy: Admin can read all enquiries
CREATE POLICY "Admin can read all enquiries" ON enquiries
  FOR SELECT
  TO authenticated
  USING (
    auth.uid()::text = current_setting('app.admin_user_id', true)
    AND (auth.jwt() ->> 'role') = 'admin'
  );
