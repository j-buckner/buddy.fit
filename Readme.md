## Buddy.Fit

# Running Locally
Spin up containers
```bash
make up
```

Seed db
```bash
psql -h localhost -p 5432 -U postgres < migrations/dump.sql
```