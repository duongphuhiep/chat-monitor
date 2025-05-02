# Chat monitor

Whatsapp or Messenger like application with AI observe the conversation.

I'd like to explore the following stack:

- solidstart
- supabase
- Go, ArangoDB.. ?

## Data model

<https://docs.google.com/presentation/d/1qI0sLWYi26BrJ0b8e6Z1YtfCNFyYAQKSrFEA5R3Yn1I>

![](assets/data-model-v1.png)

## Sprint 1: Supabase auth

## Setup

```
# supabase init
supabase start
# supabase migration up --db-url postgresql://postgres:postgres@127.0.0.1:54322/postgres
supabase db reset
cd webapp
pnpm i
pnpm dev
```
