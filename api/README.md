# temperature-monitor-api

This is a serverless API created with the [Serverless Framework](https://serverless.com/).

It creates:

- AWS Lambda functions
- DynamoDB tables
- API Gateway routes


## Credentials

You have to put your AWS credentials at `~/.aws/credentials` file.

## Deployment

Use with `nvm`:

```
nvm use
make setup
make deploy
```
