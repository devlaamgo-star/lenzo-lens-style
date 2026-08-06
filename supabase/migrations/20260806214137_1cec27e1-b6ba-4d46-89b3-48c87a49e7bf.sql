ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS items jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS quantity integer NOT NULL DEFAULT 1;
ALTER TABLE public.orders ALTER COLUMN designs SET DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ALTER COLUMN iphone_model SET DEFAULT '';
ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'pending_confirmation';