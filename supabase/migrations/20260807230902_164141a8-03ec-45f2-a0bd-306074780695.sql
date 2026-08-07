CREATE TABLE public.design_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_number TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  phone_brand TEXT NOT NULL DEFAULT '',
  phone_model TEXT NOT NULL DEFAULT '',
  request_type TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  colors TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  file_path TEXT,
  locale TEXT NOT NULL DEFAULT 'fr',
  status TEXT NOT NULL DEFAULT 'en attente de confirmation',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.design_requests TO service_role;

ALTER TABLE public.design_requests ENABLE ROW LEVEL SECURITY;
