-- Create an Enum for Roles to ensure strict types
CREATE TYPE user_role AS ENUM ('participant', 'organizer', 'sponsor', 'admin');

-- Note: The existing 'role' column in 'users' might need to be cast or we can just alter it.
-- Since the app is in early stages, we can drop the default, alter the type, and set the new default.

-- First, drop the default so we can alter the column
ALTER TABLE users ALTER COLUMN role DROP DEFAULT;

-- Alter the column to use the enum type (this will try to cast existing string values to the enum)
ALTER TABLE users ALTER COLUMN role TYPE user_role USING role::user_role;

-- Set the default back to 'participant' using the enum
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'participant'::user_role;

-- Ensure that the clerk_id is strictly unique
-- (It is already marked unique in schema.sql, but we ensure it's not null going forward if they use Clerk exclusively)
-- We will leave it nullable in case they want to allow users without Clerk auth (e.g. legacy), but for our webhook, it will be populated.

-- Add a constraint so one email can only be associated with one role (if you want strict separation by email)
-- Actually, the email is already UNIQUE in the users table, so an email can only exist once, which implicitly restricts it to one role.
-- If they wanted the same email to be able to sign up as different roles, they would need a composite unique key.
-- But since email is UNIQUE, one email = one user = one role.
