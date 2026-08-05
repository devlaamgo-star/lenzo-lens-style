CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  full_name text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  address text NOT NULL,
  iphone_model text NOT NULL,
  designs jsonb NOT NULL,
  notes text,
  total_mad integer NOT NULL DEFAULT 99,
  payment_method text NOT NULL DEFAULT 'cod',
  status text NOT NULL DEFAULT 'pending',
  locale text NOT NULL DEFAULT 'fr',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
