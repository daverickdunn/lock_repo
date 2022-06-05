import { Stack, StackProps } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface EtlStackProps extends StackProps {
  vpc: Vpc
  table: Table
}

export class EtlStack extends Stack {

  vpc: Vpc
  table: Table

  constructor(scope: Construct, id: string, props: EtlStackProps) {
    super(scope, id, props);
    this.vpc = props.vpc;
    this.table = props.table;
  }

}
