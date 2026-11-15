ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS ozon_status text,
  ADD COLUMN IF NOT EXISTS ozon_status_at timestamptz,
  ADD COLUMN IF NOT EXISTS ozon_synced_at timestamptz;
ALTER TABLE public.design_requests
  ADD COLUMN IF NOT EXISTS ozon_status text,
  ADD COLUMN IF NOT EXISTS ozon_status_at timestamptz,
  ADD COLUMN IF NOT EXISTS ozon_synced_at timestamptz;