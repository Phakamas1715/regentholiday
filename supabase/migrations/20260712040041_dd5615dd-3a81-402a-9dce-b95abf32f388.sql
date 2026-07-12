-- Replace WITH CHECK(true) with a real validation of required fields.
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(btrim(contact_name))  BETWEEN 1 AND 200
    AND length(btrim(contact_phone)) BETWEEN 4 AND 40
    AND length(btrim(org_name))     BETWEEN 1 AND 200
    AND length(btrim(destination))  BETWEEN 1 AND 200
    AND num_travelers BETWEEN 1 AND 500
  );
