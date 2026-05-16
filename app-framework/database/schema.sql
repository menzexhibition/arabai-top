-- ARABAI future app schema draft.
-- Run this only after choosing a real database provider.

create table users (
  id uuid primary key,
  email text unique not null,
  phone text,
  display_name text,
  country text,
  preferred_language text default 'en',
  role text not null default 'user' check (role in ('user', 'moderator', 'admin')),
  referral_code text unique,
  referred_by_user_id uuid references users(id),
  last_login_at timestamptz,
  created_at timestamptz default now()
);

create table wallets (
  user_id uuid primary key references users(id),
  credit_balance numeric(12, 2) not null default 0,
  pending_credit_balance numeric(12, 2) not null default 0,
  redeemable_credit_balance numeric(12, 2) not null default 0,
  reserved_credit_balance numeric(12, 2) not null default 0,
  currency text not null default 'SAR',
  updated_at timestamptz default now()
);

create table wallet_transactions (
  id uuid primary key,
  user_id uuid not null references users(id),
  type text not null check (type in ('signup_reward', 'daily_login_reward', 'contribution_reward', 'referral_reward', 'top_up', 'spend', 'refund', 'adjustment', 'reserve', 'release', 'expire')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'available', 'redeemable', 'reserved', 'spent', 'reversed')),
  credits numeric(12, 2) not null,
  money_amount numeric(12, 2),
  currency text default 'SAR',
  provider text,
  provider_reference text,
  source_id uuid,
  reviewed_by uuid references users(id),
  reviewed_at timestamptz,
  note text,
  created_at timestamptz default now()
);

create table credit_packages (
  id text primary key,
  name text not null,
  price_amount numeric(12, 2) not null,
  currency text not null,
  credits numeric(12, 2) not null,
  max_provider_cost_amount numeric(12, 2) not null,
  enabled boolean not null default false,
  created_at timestamptz default now()
);

insert into credit_packages (id, name, price_amount, currency, credits, max_provider_cost_amount, enabled) values
  ('sa_starter_10', 'Saudi Starter', 10, 'SAR', 100, 5, false),
  ('usd_starter_5', 'USD Starter', 5, 'USD', 185, 2.5, false),
  ('sa_regular_25', 'Saudi Regular', 25, 'SAR', 250, 12.5, false),
  ('usd_regular_10', 'USD Regular', 10, 'USD', 370, 5, false),
  ('sa_creative_50', 'Saudi Creative', 50, 'SAR', 500, 25, false),
  ('usd_creative_20', 'USD Creative', 20, 'USD', 740, 10, false);

create table credit_pricing_rules (
  id text primary key,
  task_type text not null check (task_type in ('chat', 'prompt', 'image', 'video', 'music', 'slides', 'document')),
  label text not null,
  min_credits numeric(12, 2) not null,
  max_credits numeric(12, 2) not null,
  cost_level text not null check (cost_level in ('low', 'medium', 'high', 'manual')),
  free_credits_allowed boolean not null default false,
  requires_confirmation boolean not null default true,
  enabled boolean not null default true,
  notes text,
  updated_at timestamptz default now()
);

insert into credit_pricing_rules (id, task_type, label, min_credits, max_credits, cost_level, free_credits_allowed, requires_confirmation, notes) values
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
  ('music_generation', 'music', 'Music generation', 30, 80, 'high', false, true, 'Short background music sample.');

create table ai_tasks (
  id uuid primary key,
  user_id uuid not null references users(id),
  task_type text not null check (task_type in ('chat', 'prompt', 'image', 'video', 'music', 'slides', 'document')),
  pricing_rule_id text references credit_pricing_rules(id),
  status text not null check (status in ('draft', 'estimated', 'confirmed', 'queued', 'running', 'completed', 'failed', 'refunded', 'cancelled')),
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
  created_at timestamptz default now(),
  started_at timestamptz,
  completed_at timestamptz
);

create table community_submissions (
  id uuid primary key,
  user_id uuid not null references users(id),
  type text not null check (type in ('question', 'ai_example', 'tool_suggestion', 'correction', 'tutorial_feedback', 'beginner_tip')),
  title text not null,
  content text not null,
  url_optional text,
  status text not null default 'submitted' check (status in ('submitted', 'under_review', 'approved', 'rejected', 'spam')),
  quality_score int,
  reward_credits numeric(12, 2),
  reviewed_by uuid references users(id),
  review_note text,
  created_at timestamptz default now(),
  reviewed_at timestamptz
);

create table referrals (
  id uuid primary key,
  referrer_user_id uuid not null references users(id),
  referred_user_id uuid references users(id),
  status text not null default 'pending' check (status in ('pending', 'verified', 'rewarded', 'rejected')),
  reward_credits numeric(12, 2),
  created_at timestamptz default now(),
  verified_at timestamptz,
  rewarded_at timestamptz
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
