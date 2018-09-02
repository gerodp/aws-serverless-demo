# Sample Query Lambda

Lambda function that runs a series of DB queries to test how Aurora Serverless works

## Getting started

Prerequisites:

* Nodejs Installed
* AWS Account created and configured via AWS cli or via Env Variables
* Serverless RDS created

Note: We'll work in Ireland Region (eu-west-1) but you can change it by editing serverless.yml


Install serverless framework

```
npm install -g serverless
```

Configure serverless with your AWS account

### Deploy

Clone config.temp.yml into config.yml and set the proper values for the variables with your Serverless RDS details.

Deploy your stack with your function:

```
cd query-serverless-rds-lambda/
serverless deploy -v
```

For deploying future changes in lambda function without updating CloudFormation do:

```
serverless deploy function --function queryRDS
```

### Run

In order to run the function

```
serverless invoke -f queryRDS -l
```

### Cleanup

```
serverless remove
```

