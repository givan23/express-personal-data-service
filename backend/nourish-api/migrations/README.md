# Migrations

This folder contains Sequelize migrations.

## Naming

Use timestamped names:

- `YYYYMMDDHHmmss-description.cjs`

## Run

- `npm run migration:up`
- `npm run migration:down`
- `npm run migration:status`

## Baseline for existing DB

If your database already has the current schema (`users`, `user_profiles`, `user_preferences`),
run the baseline migration to register the starting point in `SequelizeMeta`.

1. Check pending/applied migrations:
   - `npm run migration:status`
2. Apply baseline:
   - `npm run migration:up`
3. Re-check status:
   - `npm run migration:status`

The baseline migration does not create or alter tables. It only verifies required tables
exist, then marks the baseline as applied.

## Create a new migration

Use Sequelize CLI from this folder:

```bash
npx sequelize-cli migration:generate --name add-user-profiles-table
```

