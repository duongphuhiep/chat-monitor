# webapp

## Generate typescript models

```
supabase gen types typescript --local --schema chat_monitor>src/lib/database.gen.ts
```

## Run on production

```
## build for production
pnpm build

## deploy the generated .output/ folder
cd .output/

## start the node server and use all the Core:
pm2 start server/index.mjs -i max

## checkout the docs for other pm2 command
pm2 ls
pm2 logs
pm2 restart
```
