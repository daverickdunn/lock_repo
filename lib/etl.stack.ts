import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface EtlStackProps extends StackProps {
  vpc_stack: Stack
  db_stack: Stack
}

export class EtlStack extends Stack {
  constructor(scope: Construct, id: string, props: EtlStackProps) {
    super(scope, id, props);

  }
}
