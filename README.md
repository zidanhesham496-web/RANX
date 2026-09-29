# RANX

RANX is a React + Vite SaaS foundation with username-based Supabase authentication and role-protected user and admin routes.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and provide the Supabase project URL and public anon key.
3. Apply `supabase/migrations/0001_profiles.sql` and `supabase/migrations/0002_client_profile_signup.sql` to the project.
4. Disable email confirmation in Supabase Auth. RANX maps usernames to internal `@auth.ranx.invalid` addresses, so signup needs an immediate session to insert the profile and those addresses cannot receive confirmation mail.
5. Run `npm run dev`.

Username and password authentication uses Supabase Auth directly; profile creation is a client insert guarded by row-level security. Registration always creates a `user` profile; promote trusted accounts to `admin` through a secure server-side process or the Supabase SQL editor. Users can read only their own profile and cannot change their role.

Username/password authentication has no email verification or password-recovery channel in this initial scaffold. Add a verified recovery method, rate limiting, and production origin restrictions before launch.
