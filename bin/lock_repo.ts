#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc.stack';
import { EtlStack } from '../lib/etl.stack';
import { DbStack } from '../lib/db.stack';

const app = new cdk.App();

const vpc_stack = new VpcStack(app, 'vpc-stack', {});

const db_stack = new DbStack(app, 'db-stack', {});

const etl_stack = new EtlStack(app, 'etl-stack', {
  vpc: vpc_stack.vpc,
  table: db_stack.feed_table
});