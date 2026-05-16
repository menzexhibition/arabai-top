-- ARABAI Supabase migration draft.
-- Review before running in production.

create extension if not exists "pgcrypto";

create type public.app_role as enum ('user', 'moderator', 'admin');
create type public.transaction_type as enum (
  'signup_reward',
  'daily_login_reward',
  'contribution_reward',
  'referral_reward',
  'top_up',
  'spend',
  'refund',
  'adjustment',
  'reserve',
  'release',
  'expire'
);
create type public.transaction_status as enum (
  'pending',
  'approved',
  'rejected',
  'available',
  'redeemable',
  'reserved',
  'spent',
  'reversed'
);
create type public.task_type as enum ('chat', 'prompt', 'image', 'video', 'music', 'slides', 'document');
create type public.task_status as enum ('draft', 'estimated', 'confirmed', 'queued', 'running', 'completed', 'failed', 'refunded', 'cancelled');
create type public.cost_level as enum ('low', 'medium', 'high', 'manual');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  phone text,
  display_name text,
  country text,
  preferred_language text not null default 'ar',
  role public.app_role not null default 'user',
  referral_code text unique not null default encode(gen_random_bytes(6), 'hex'),
  referred_by_user_id uuid references public.profiles(id),
  signup_reward_granted boolean not null default false,
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.wallets (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  credit_balance numeric(12, 2) not null default 0,
  pending_credit_balance numeric(12, 2) not null default 0,
  redeemable_credit_balance numeric(12, 2) not null default 0,
  reserved_credit_balance numeric(12, 2) not null default 0,
  currency text not null default 'SAR',
  updated_at timestamptz not null default now()
);

create table public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type public.transaction_type not null,
  status public.transaction_status not null default 'pending',
  credits numeric(12, 2) not null,
  money_amount numeric(12, 2),
  currency text default 'SAR',
  provider text,
  provider_reference text,
  source_id uuid,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  note text,
  created_at timestamptz not null default now()
);

create table public.credit_packages (
  id text primary key,
  name text not null,
  price_amount numeric(12, 2) not null,
  currency text not null,
  credits numeric(12, 2) not null,
  max_provider_cost_amount numeric(12, 2) not null,
  enabled boolean not null default false,
  created_at timestamptz not null default now()
);

insert into public.credit_packages (id, name, price_amount, currency, credits, max_provider_cost_amount, enabled) values
  ('sa_starter_10', 'Saudi Starter', 10, 'SAR', 100, 5, false),
  ('usd_starter_5', 'USD Starter', 5, 'USD', 185, 2.5, false),
  ('sa_regular_25', 'Saudi Regular', 25, 'SAR', 250, 12.5, false),
  ('usd_regular_10', 'USD Regular', 10, 'USD', 370, 5, false),
  ('sa_creative_50', 'Saudi Creative', 50, 'SAR', 500, 25, false),
  ('usd_creative_20', 'USD Creative', 20, 'USD', 740, 10, false)
on conflict (id) do nothing;

create table public.credit_pricing_rules (
  id text primary key,
  task_type public.task_type not null,
  label text not null,
  min_credits numeric(12, 2) not null,
  max_credits numeric(12, 2) not null,
  cost_level public.cost_level not null,
  free_credits_allowed boolean not null default false,
  requires_confirmation boolean not null default true,
  enabled boolean not null default true,
  notes text,
  updated_at timestamptz not null default now()
);

insert into public.credit_pricing_rules (id, task_type, label, min_credits, max_credits, cost_level, free_credits_allowed, requires_confirmation, notes) values
  ('premium_short_chat', 'chat', 'Premium short chat', 2, 2, 'low', true, false, 'Stronger model answer, rewrite, translate, explain.'),
  ('prompt_improvement', 'prompt', 'Prompt improvement', 2, 2, 'low', true, false, 'Turn messy idea into clear prompt.'),
  ('premium_long_answer', 'chat', 'Premium long answer', 5, 5, 'medium', true, true, 'Plan, proposal, detailed comparison.'),
  ('long_document_summary', 'document', 'Long document summary', 10, 20, 'medium', false, true, 'PDF/report summary and action items.'),
  ('table_file_analysis', 'document', 'Table/file analysis', 10, 20, 'medium', false, true, 'Spreadsheet explanation or small data analysis.'),
  ('image_prompt_review', 'image', 'Image prompt and review', 3, 3, 'low', true, false, 'Create image prompt and improvement notes.'),
  ('image_generation_low', 'image', 'Low-tier image generation', 20, 40, 'medium', true, true, 'One basic generated image, capped for free credits.'),
  ('image_generation_high', 'image', 'High-tier image generation', 50, 80, 'high', false, true, 'Higher-quality poster or product image.'),
  ('image_edit', 'image', 'Image edit', 40, 80, 'high', false, true, 'Background change or product improvement.'),
  ('ppt_outline', 'slides', 'PPT outline', 8, 15, 'medium', true, true, 'Slide story, titles, content skeleton.'),
  ('ppt_first_draft', 'slides', 'PPT first draft', 30, 60, 'medium', false, true, 'More complete deck text and layout plan.'),
  ('video_script', 'video', 'Video script', 8, 15, 'medium', true, true, 'Short video idea, hook, shot list.'),
  ('storyboard_text', 'video', '9-grid storyboard text', 15, 25, 'medium', false, true, 'Nine scene prompts for image generation.'),
  ('storyboard_images', 'video', '9-grid storyboard images', 120, 250, 'high', false, true, 'Generate nine related images.'),
  ('video_generation_short', 'video', 'Short video generation', 0, 0, 'manual', false, true, 'Manual pricing or coming soon.'),
  ('music_generation', 'music', 'Music generation', 30, 80, 'high', false, true, 'Short background music sample.')
on conflict (id) do nothing;

create table public.ai_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  task_type public.task_type not null,
  pricing_rule_id text references public.credit_pricing_rules(id),
  status public.task_status not null default 'draft',
  estimated_credits numeric(12, 2) not null,
  actual_credits numeric(12, 2),
  reserved_credits numeric(12, 2),
  provider text,
  model_name text,
  provider_cost_amount numeric(12, 6),
  provider_cost_currency text,
  input_summary text,
  output_url text,
  output_text text,
  error_message text,
  created_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz
);

create table public.payment_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  provider text not null,
  provider_event_id text unique not null,
  package_id text references public.credit_packages(id),
  amount numeric(12, 2),
  currency text,
  status text not null,
  raw_event jsonb,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.provider_cost_logs (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references public.ai_tasks(id) on delete cascade,
  provider text not null,
  model_name text,
  input_units numeric(18, 6),
  output_units numeric(18, 6),
  cost_amount numeric(12, 6),
  currency text,
  raw_meta jsonb,
  created_at timestamptz not null default now()
);

create table public.community_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('question', 'ai_example', 'tool_suggestion', 'correction', 'tutorial_feedback', 'beginner_tip')),
  title text not null,
  content text not null,
  url_optional text,
  status text not null default 'submitted' check (status in ('submitted', 'under_review', 'approved', 'rejected', 'spam')),
  quality_score int,
  reward_credits numeric(12, 2),
  reviewed_by uuid references public.profiles(id),
  review_note text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_user_id uuid not null references public.profiles(id) on delete cascade,
  referred_user_id uuid references public.profiles(id),
  status text not null default 'pending' check (status in ('pending', 'verified', 'rewarded', 'rejected')),
  reward_credits numeric(12, 2),
  created_at timestamptz not null default now(),
  verified_at timestamptz,
  rewarded_at timestamptz
);

create index wallet_transactions_user_created_idx on public.wallet_transactions (user_id, created_at desc);
create index ai_tasks_user_created_idx on public.ai_tasks (user_id, created_at desc);
create index ai_tasks_status_created_idx on public.ai_tasks (status, created_at);
create index provider_cost_logs_task_idx on public.provider_cost_logs (task_id);
create index community_submissions_status_idx on public.community_submissions (status, created_at);
create index referrals_referrer_idx on public.referrals (referrer_user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.wallets enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.credit_packages enable row level security;
alter table public.credit_pricing_rules enable row level security;
alter table public.ai_tasks enable row level security;
alter table public.payment_events enable row level security;
alter table public.provider_cost_logs enable row level security;
alter table public.community_submissions enable row level security;
alter table public.referrals enable row level security;

create policy "users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "users can read own wallet" on public.wallets for select using (auth.uid() = user_id);
create policy "users can read own transactions" on public.wallet_transactions for select using (auth.uid() = user_id);

create policy "public can read enabled packages" on public.credit_packages for select using (enabled = true);
create policy "authenticated can read pricing rules" on public.credit_pricing_rules for select using (auth.role() = 'authenticated' and enabled = true);

create policy "users can read own tasks" on public.ai_tasks for select using (auth.uid() = user_id);
create policy "users can read own payment events" on public.payment_events for select using (auth.uid() = user_id);
create policy "users can read own submissions" on public.community_submissions for select using (auth.uid() = user_id);
create policy "users can create own submissions" on public.community_submissions for insert with check (auth.uid() = user_id);
create policy "users can read own referrals" on public.referrals for select using (auth.uid() = referrer_user_id or auth.uid() = referred_user_id);

-- Writes that change balances, task status, payment state, rewards, or provider costs
-- should be performed through service-role backend functions only.

