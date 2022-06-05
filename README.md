# Richard's Solution


## Steps/Commands:

- `mkdir lock_repo`
- `npm i -g aws-cdk`
- `cdk init --language=typescript`
- Create stack constructs and link them (easier to manage resources as separate stacks).
- Implement VPC stack
- Implement DB stack
- Bootstrap environment
- `cdk bootstrap`
- Deploy VPC stack
- `npm run deploy-vpc`
- Deploy DB stack
- `npm run deploy-db`
