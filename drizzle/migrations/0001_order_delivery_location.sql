ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_zone text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS full_address text;
UPDATE public.orders SET full_address = address WHERE full_address IS NULL;
COMMENT ON COLUMN public.orders.delivery_zone IS 'Exact approved Ozon delivery-zone label selected at checkout; null for historical orders without an approved zone.';
COMMENT ON COLUMN public.orders.full_address IS 'Complete customer street, residence and apartment address, separate from delivery zone.';