CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email text,
  full_name text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.queries (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  query text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT queries_pkey PRIMARY KEY (id),
  CONSTRAINT queries_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.resources (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  topic text NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['ppt'::text, 'video'::text, 'text'::text])),
  url text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT resources_pkey PRIMARY KEY (id)
);