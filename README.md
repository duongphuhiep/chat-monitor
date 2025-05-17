# Chat monitor

Whatsapp or Messenger like application with AI observe the conversation.

I'd like to explore the following stack:

- solidstart or solid/astro
- supabase

## Data model

<https://docs.google.com/presentation/d/1qI0sLWYi26BrJ0b8e6Z1YtfCNFyYAQKSrFEA5R3Yn1I>

![](assets/data-model-v1.png)

## Setup

### Initialize DEV local supabase

```
supabase init
supabase start
supabase db reset
```

### Initialize existing supabase

```
supabase db reset --db-url 'postgres://postgres:your-super-secret-and-long-postgres-password@localhost:5432/'
```

## Run application:

```
cd webapp
pnpm i
pnpm dev
```
