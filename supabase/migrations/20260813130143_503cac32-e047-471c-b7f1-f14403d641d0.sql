-- Extend orders and design_requests for the admin operations dashboard
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'cod_pending',
  ADD COLUMN IF NOT EXISTS shipping_carrier text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS tracking_number text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS shipped_at timestamptz,
  ADD COLUMN IF NOT EXISTS expected_delivery_at timestamptz,
  ADD COLUMN IF NOT EXISTS admin_notes text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS priority text NOT NULL DEFAULT 'normal',
  ADD COLUMN IF NOT EXISTS archived boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS status_history jsonb NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE public.design_requests
  ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'cod_pending',
  ADD COLUMN IF NOT EXISTS shipping_carrier text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS tracking_number text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS shipped_at timestamptz,
  ADD COLUMN IF NOT EXISTS expected_delivery_at timestamptz,
  ADD COLUMN IF NOT EXISTS admin_notes text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS priority text NOT NULL DEFAULT 'normal',
  ADD COLUMN IF NOT EXISTS archived boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS status_history jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Seed the timeline with the creation event for existing rows
UPDATE public.orders
SET status_history = jsonb_build_array(jsonb_build_object('status', status, 'at', created_at))
WHERE status_history = '[]'::jsonb;

UPDATE public.design_requests
SET status_history = jsonb_build_array(jsonb_build_object('status', status, 'at', created_at))
WHERE status_history = '[]'::jsonb;