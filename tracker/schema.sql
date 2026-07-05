-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Safe to run inside an EXISTING project's database: the table name is prefixed
-- and lives in the public schema, so it won't collide with an app's own tables.
-- Timestamps are stored in UTC (timestamptz). Convert to IST when reporting.

create table if not exists public.portfolio_visits (
    id          bigint generated always as identity primary key,
    created_at  timestamptz not null default now(),  -- UTC
    ip          text,
    user_agent  text,
    os          text,
    browser     text,
    device      text,          -- mobile | tablet | desktop | other
    city        text,
    country     text,
    referrer    text,
    path        text,
    src         text           -- the ?src= UTM value (resume / linkedin / colddm ...)
);

-- Summary queries filter on the last 24h and group by src, so index those.
create index if not exists portfolio_visits_created_at_idx on public.portfolio_visits (created_at desc);
create index if not exists portfolio_visits_src_idx        on public.portfolio_visits (src);

-- Lock the table down: enable RLS with NO policies. The backend uses the
-- service-role key, which bypasses RLS; the public anon key can't read/write.
alter table public.portfolio_visits enable row level security;
