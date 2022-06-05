import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Queue } from 'aws-cdk-lib/aws-sqs';
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

    // task queue
    const feed_queue = this.feedQueue();

    // lambdas
    const feed_fn = this.processFeedFn(this.vpc, feed_queue.queueUrl);
    const content_fn = this.processContentFn(this.vpc, feed_queue.queueUrl);

    feed_queue.grantSendMessages(feed_fn);
    feed_queue.grantConsumeMessages(content_fn);

    // schedule executions
    this.scheduleProcessFeedExecution(feed_fn);
    this.scheduleProcessContentExecution(content_fn);

    // grant db access
    this.table.grantReadWriteData(feed_fn);

  }

  private processFeedFn(vpc: Vpc, queueUrl: string) {
    return new NodejsFunction(this, 'process-feed', {
      entry: 'src/process-feed.lambda.ts',
      timeout: Duration.seconds(10),
      bundling: {
        sourceMap: true,
        minify: true
      },
      environment:{
        FEED_QUEUE: queueUrl
      },
      vpc,
      logRetention: RetentionDays.ONE_MONTH
    })
  }

  private processContentFn(vpc: Vpc, queueUrl: string) {
    return new NodejsFunction(this, 'process-content', {
      entry: 'src/process-content.lambda.ts',
      timeout: Duration.seconds(60),
      bundling: {
        sourceMap: true,
        minify: true
      },
      environment:{
        FEED_QUEUE: queueUrl
      },
      vpc,
      logRetention: RetentionDays.ONE_MONTH
    })
  }

  private feedQueue(){
    return new Queue(this, 'feed-queue', {
      queueName: 'feed-queue'
    })
  }

  private scheduleProcessFeedExecution(func: NodejsFunction) {
    new Rule(this, 'process-feed-rule', {
      schedule: Schedule.rate(Duration.minutes(5)),
      targets: [new LambdaFunction(func)],
    })
  }

  private scheduleProcessContentExecution(func: NodejsFunction) {
    new Rule(this, 'process-content-rule', {
      schedule: Schedule.rate(Duration.minutes(1)),
      targets: [new LambdaFunction(func)],
    })
  }

}
