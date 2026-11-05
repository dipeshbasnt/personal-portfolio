-- Migration: 02_admin_policies.sql

-- Ensure RLS is enabled on enquiries
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (for idempotency)
DROP POLICY IF EXISTS "Admin can manage all enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admin can read all enquiries" ON enquiries;
DROP POLICY IF EXISTS "Public can read public enquiries" ON enquiries;

-- Policy: Admin has full access to all enquiries
CREATE POLICY "Admin full access" ON enquiries
  FOR ALL
  TO authenticated
  USING (
    auth.uid()::text = current_setting('app.admin_user_id', true)
    AND (auth.jwt() ->> 'role')::text = 'admin'
  )
  WITH CHECK (
    auth.uid()::text = current_setting('app.admin_user_id', true)
    AND (auth.jwt() ->> 'role')::text = 'admin'
  );

-- Policy: Admin can read all enquiries (redundant but explicit for clarity)
CREATE POLICY "Admin read access" ON enquiries
  FOR SELECT
  TO authenticated
  USING (
    auth.uid()::text = current_setting('app.admin_user_id', true)
    AND (auth.jwt() ->> 'role')::text = 'admin'
  );

-- Policy: Public users can read all enquiries (read-only)
-- Restrict this if you have sensitive data you don't want public
CREATE POLICY "Public read access" ON enquiries
  FOR SELECT
  TO public
  USING (true);
