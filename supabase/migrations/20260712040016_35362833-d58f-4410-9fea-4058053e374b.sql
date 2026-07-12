-- ============================================================================
-- Security hardening migration
-- ============================================================================
-- Fixes:
--   * SUPA_anon/authenticated_security_definer_function_executable
--     (has_role moved to private schema; trigger functions revoked from callers)
--   * SUPA_rls_policy_always_true (all USING(true)/WITH CHECK(true) replaced)
--   * leads_missing_delete_policy (leads read/update/delete restricted to admin)
--   * quotations_any_authenticated_can_access (quotations restricted to admin)
--   * tour_programs_any_authenticated_can_modify (writes restricted to admin;
--     public SELECT of active programs preserved)
-- ============================================================================

-- ------------------------------------------------------------
-- 1. Create private schema to host role-check function
-- ------------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

-- ------------------------------------------------------------
-- 2. Drop existing overly-permissive / dependent policies
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Admins can view all roles"                    ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can view leads"           ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can update leads"         ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can manage quotations"    ON public.quotations;
DROP POLICY IF EXISTS "Authenticated users can manage tour programs" ON public.tour_programs;
DROP POLICY IF EXISTS "Authenticated users can delete tour programs" ON public.tour_programs;

-- ------------------------------------------------------------
-- 3. Recreate has_role in the private schema (not exposed via API)
--    Old public.has_role is dropped after policies that used it were removed.
-- ------------------------------------------------------------
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- ------------------------------------------------------------
-- 4. Lock down trigger-only SECURITY DEFINER functions in public schema
--    Triggers still fire because the trigger system bypasses the EXECUTE check.
-- ------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public.handle_new_user()           FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column()  FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------
-- 5. Restore admin-view policy on user_roles
-- ------------------------------------------------------------
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

-- ------------------------------------------------------------
-- 6. leads — admin only for SELECT / UPDATE / DELETE.
--    Public INSERT (contact form) already exists and is preserved.
-- ------------------------------------------------------------
CREATE POLICY "Admins can view all leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
  ON public.leads FOR DELETE
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

-- ------------------------------------------------------------
-- 7. quotations — admin only for every operation
-- ------------------------------------------------------------
CREATE POLICY "Admins can view quotations"
  ON public.quotations FOR SELECT
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert quotations"
  ON public.quotations FOR INSERT
  TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update quotations"
  ON public.quotations FOR UPDATE
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete quotations"
  ON public.quotations FOR DELETE
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

-- ------------------------------------------------------------
-- 8. tour_programs — admin only for writes; keep public SELECT for active tours
--    ("Anyone can view active tour programs" policy remains in place)
-- ------------------------------------------------------------
CREATE POLICY "Admins can view all tour programs"
  ON public.tour_programs FOR SELECT
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert tour programs"
  ON public.tour_programs FOR INSERT
  TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update tour programs"
  ON public.tour_programs FOR UPDATE
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete tour programs"
  ON public.tour_programs FOR DELETE
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));
