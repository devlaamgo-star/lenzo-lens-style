ALTER TABLE public.orders
  ADD COLUMN traffic_source text NOT NULL DEFAULT 'direct',
  ADD COLUMN utm_source text NOT NULL DEFAULT '',
  ADD COLUMN utm_medium text NOT NULL DEFAULT '',
  ADD COLUMN utm_campaign text NOT NULL DEFAULT '',
  ADD COLUMN fbclid text NOT NULL DEFAULT '',
  ADD COLUMN ttclid text NOT NULL DEFAULT '';