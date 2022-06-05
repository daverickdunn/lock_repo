import { Stack, StackProps } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class VpcStack extends Stack {

  public vpc: Vpc;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.vpc = this.createVpc();
  }

  private createVpc() {
    return new Vpc(this, 'VPC', {
      enableDnsSupport: true,
      maxAzs: 2
    })
  }

}