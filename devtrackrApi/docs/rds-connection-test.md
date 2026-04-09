# Testing RDS Connection

Once your AWS RDS instance is running, you can verify connectivity locally using the `psql` command.

### Command Execution

Run the following command in your terminal, replacing `RDS_ENDPOINT` with the endpoint URL provided in the AWS Console:

```bash
psql -h RDS_ENDPOINT -U postgres -d devtrackr
```

It will prompt you for the password you defined during the creation step. If you successfully connect, you are ready to apply Prisma migrations!