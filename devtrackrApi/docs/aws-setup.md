# AWS RDS Setup Guide

This document outlines the steps to create a production PostgreSQL database on AWS RDS.

### Step-by-Step Creation
1. Go to **AWS Console** → **RDS** → **Create database**.
2. **Engine:** Select `PostgreSQL 16`
3. **Template:** Select `Free tier`
4. **DB instance identifier:** `db.t3.micro`
5. **Master dataset Name (DB name):** `devtrackr`
6. **Master username:** `postgres`
7. **Public Access:** Select `YES` (This is temporary for initial setup and migrations)
8. **VPC Security Group:** Create new or use existing. Make sure to allow inbound TCP traffic on port `5432` from `0.0.0.0/0` (temporary).
9. Click **Create database** and wait for provisioning.
10. Once created, copy the **Endpoint URL** from the Connectivity & security tab to use in your `.env.production` file.