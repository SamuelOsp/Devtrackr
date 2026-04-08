# RDS Connection Test

To test the connection to your AWS RDS instance, you can use the `psql` command-line tool.

Run the following command in your terminal:

```bash
psql -h RDS_ENDPOINT -U postgres -d devtrackr
```

Make sure to replace `RDS_ENDPOINT` with your actual RDS instance endpoint URL.
You will be prompted to enter the password you set during the database creation.