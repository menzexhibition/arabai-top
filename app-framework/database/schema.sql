-- ARABAI future app schema draft.
-- Run this only after choosing a real database provider.

create table users (
  id uuid primary key,
  email text unique not null,
  country text,
  preferred_language text default 'en',
  created_at timestamptz default now()
);

create table wallets (
  user_id uuid primary key references users(id),
  credit_balance numeric(12, 2) not null default 0,
  currency text not null default 'USD',
  updated_at timestamptz default now()
);

create table wallet_transactions (
  id uuid primary key,
  user_id uuid not null references users(id),
  type text not null check (type in ('top_up', 'spend', 'refund', 'adjustment', 'reserve', 'release')),
  credits numeric(12, 2) not null,
  money_amount numeric(12, 2),
  currency text default 'USD',
  provider text,
  provider_reference text,
  note text,
  created_at timestamptz default now()
);

create table ai_tasks (
  id uuid primary key,
  user_id uuid not null references users(id),
  task_type text not null check (task_type in ('chat', 'image', 'video', 'music', 'slides', 'document')),
  status text not null check (status in ('draft', 'confirmed', 'running', 'completed', 'failed', 'refunded')),
  estimated_credits numeric(12, 2) not null,
  actual_credits numeric(12, 2),
  provider text,
  model_name text,
  input_summary text,
  output_url text,
  error_message text,
  created_at timestamptz default now(),
  completed_at timestamptz
);

create table outbound_clicks (
  id uuid primary key,
  -- Nullable by design: ARABAI public articles can be read without login, so
  -- outbound clicks from anonymous visitors should still be measurable. When a
  -- visitor is signed in, store users.id here; otherwise leave it null.
  user_id uuid references users(id),
  article_id text,
  link_label text,
  target_url text not null,
  link_type text,
  created_at timestamptz default now()
);

create table recharge_exposure_events (
  id uuid primary key,
  user_id uuid references users(id),
  anonymous_bucket int,
  intent_score int,
  article_id text,
  shown boolean default false,
  created_at timestamptz default now()
);

create table task_marketplace_leads (
  id uuid primary key,
  user_id uuid references users(id),
  task_title text not null,
  task_type text,
  budget_amount numeric(12, 2),
  currency text default 'USD',
  status text default 'draft',
  created_at timestamptz default now()
);
