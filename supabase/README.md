# Supabase-cli commands

```
supabase db reset --db-url postgres://postgres.your-tenant-id:your-super-secret-and-long-postgres-password@localhost:5432/
supabase db push --db-url postgres://postgres.your-tenant-id:your-super-secret-and-long-postgres-password@localhost:5432/postgres
```

## Make pooler work

If the pooler fall into infinite crash loop the convert CRLF to LF for the pooler config file: `/chat-monitor/supabase/compose/volumes/pooler/pooler.exs`

## Generate migration script

<https://www.youtube.com/watch?v=EALkUlOKvAs>
<https://supabase.com/docs/guides/local-development/declarative-database-schemas>

supabase db diff -f migration_name
