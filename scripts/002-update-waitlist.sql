-- Add new columns to waitlist table for Fuga
-- Run this in your Supabase SQL Editor

-- Add address fields
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS direccion text;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS ciudad text;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS codigo_postal text;

-- Add product selection fields
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS productos jsonb DEFAULT '[]'::jsonb;
-- productos will store array of objects like: [{"producto": "maple_30", "cantidad": 2}, {"producto": "maple_6", "cantidad": 1}]

-- Add delivery frequency fields
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS entregas_por_mes integer DEFAULT 1;
-- 1 = una vez al mes, 2 = dos veces al mes

ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS cantidad_por_entrega integer DEFAULT 1;
-- cuantos productos por cada entrega

-- Add total monthly estimate
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS total_mensual integer DEFAULT 0;
-- cantidad total de productos por mes

-- Make telefono required (update if needed)
-- ALTER TABLE waitlist ALTER COLUMN telefono SET NOT NULL;
