-- Migration: Update waitlist table with normalized address fields
-- Run this in your Supabase SQL Editor

-- Add new address columns
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS direccion_completa TEXT;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS calle TEXT;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS numero TEXT;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS piso_depto TEXT;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS ciudad TEXT;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS provincia TEXT;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS codigo_postal TEXT;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS lat DOUBLE PRECISION;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS lon DOUBLE PRECISION;

-- Add products and delivery columns if not exists
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS productos JSONB;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS entregas_por_mes INTEGER DEFAULT 1;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS cantidad_por_entrega INTEGER DEFAULT 0;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS total_mensual INTEGER DEFAULT 0;

-- Remove old columns that are now replaced (if they exist)
-- Keep 'direccion' as alias to 'direccion_completa' for backwards compatibility
-- ALTER TABLE waitlist DROP COLUMN IF EXISTS direccion;
-- ALTER TABLE waitlist DROP COLUMN IF EXISTS zona;

-- Update RLS policies to allow these new columns
-- (existing policies should work as they apply to the whole table)
