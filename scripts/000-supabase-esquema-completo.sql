-- Esquema completo de la landing de Fuga (tabla waitlist)
-- Usar este archivo para crear la base desde cero en un proyecto NUEVO de Supabase.
-- Pegarlo en Supabase > SQL Editor > New query > Run.
-- (Los scripts 001-003 son el historial de migraciones; con este alcanza.)

CREATE TABLE IF NOT EXISTS public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  email text NOT NULL UNIQUE,
  telefono text,
  zona text,
  created_at timestamptz DEFAULT now(),
  direccion_completa text,
  calle text,
  numero text,
  piso_depto text,
  provincia text,
  lat double precision,
  lon double precision,
  productos jsonb,
  entregas_por_mes integer DEFAULT 1,
  cantidad_por_entrega integer DEFAULT 0,
  total_mensual integer DEFAULT 0,
  ciudad text,
  codigo_postal text
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede anotarse desde la landing (solo insertar)
DROP POLICY IF EXISTS "Allow public inserts" ON public.waitlist;
CREATE POLICY "Allow public inserts" ON public.waitlist
  FOR INSERT TO anon
  WITH CHECK (true);

-- Solo usuarios logueados (admin) pueden leer
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.waitlist;
CREATE POLICY "Allow authenticated reads" ON public.waitlist
  FOR SELECT TO authenticated
  USING (true);
