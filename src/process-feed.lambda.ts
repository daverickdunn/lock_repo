import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

interface FeedItem {
    url: string;
}

interface Mention {
    kg_id: string;
    count: number;
}

const client = new SQSClient({});

async function SendMessage(MessageBody: string) {
    const command = new SendMessageCommand({
        QueueUrl: process.env.FEED_QUEUE,
        MessageBody
    });
    return await client.send(command);
}

async function GetFeed() {
    // scan DDB (running out of time...)
    const urls: string[] = [];
    for (const url of urls) {
        await SendMessage(JSON.stringify({ url })) // batch is more efficient, but takes longer to write up
    }
}

exports.handler = async () => {
    await GetFeed();
}