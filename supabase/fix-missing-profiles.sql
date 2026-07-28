-- ════════════════════════════════════════════════════════
--  KEEPO DZ — Correctif : profils manquants
--  À exécuter dans Supabase (projet keepo-dz) → SQL Editor → Run
--  Cause : des comptes ont été créés avant que le trigger
--  handle_new_user n'existe → auth.users sans ligne profiles
--  → violation de clé étrangère (loyalty_balances, merchant_cards…).
-- ════════════════════════════════════════════════════════

-- 1) DIAGNOSTIC (optionnel) : combien d'utilisateurs sans profil ?
--    Décommentez pour voir le compte avant/après.
-- select
--   (select count(*) from auth.users)      as utilisateurs,
--   (select count(*) from public.profiles) as profils;

-- 2) BACKFILL : crée un profil pour chaque utilisateur qui n'en a pas.
--    Le rôle / nom / plan sont repris des métadonnées d'inscription.
insert into public.profiles (id, name, email, role, plan, referral_code)
select u.id,
       coalesce(u.raw_user_meta_data->>'name', u.raw_user_meta_data->>'full_name', 'Utilisateur'),
       u.email,
       coalesce(nullif(u.raw_user_meta_data->>'role', ''), 'client'),
       coalesce(nullif(u.raw_user_meta_data->>'plan', ''), 'essential'),
       case when coalesce(nullif(u.raw_user_meta_data->>'role', ''), 'client') = 'commercant'
            then upper(substr(md5(u.id::text), 1, 8)) else null end
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null
on conflict (id) do nothing;

-- 3) S'ASSURER QUE LE TRIGGER EXISTE (pour les futurs comptes).
--    Recrée la fonction + le trigger (idempotent).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_role     text := coalesce(nullif(new.raw_user_meta_data->>'role', ''), 'client');
  v_ref_code text := nullif(upper(trim(new.raw_user_meta_data->>'ref_code')), '');
  v_referrer uuid;
begin
  insert into public.profiles (id, name, email, role, plan, referral_code)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', 'Utilisateur'),
    new.email,
    v_role,
    coalesce(nullif(new.raw_user_meta_data->>'plan', ''), 'essential'),
    case when v_role = 'commercant' then upper(substr(md5(new.id::text), 1, 8)) else null end
  )
  on conflict (id) do nothing;

  if v_role = 'commercant' and v_ref_code is not null then
    select id into v_referrer from public.profiles
      where referral_code = v_ref_code and role = 'commercant' and id <> new.id
      limit 1;
    if v_referrer is not null then
      insert into public.merchant_referrals (referrer_id, referred_id, status)
      values (v_referrer, new.id, 'pending')
      on conflict (referred_id) do nothing;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
