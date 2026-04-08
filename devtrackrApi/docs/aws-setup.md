# AWS RDS Setup Guide

1. Go to **AWS Console** → **RDS** → **Create database**.
2. **Engine**: Select `PostgreSQL 16`.
3. **Template**: Choose `Free tier`.
4. **DB instance**: Select `db.t3.micro`.
5. **DB name**: Set it to `devtrackr` (under Additional configuration).
6. **Username**: `postgres`.
7. **Enable public access**: Select `YES` (Note: This is temporary for initial setup and migration).
8. **Security group**: Ensure inbound rules allow TCP port `5432` from `0.0.0.0/0` (temporary).
9. After creation completes, copy the **endpoint URL** from the Connectivity & security tab.