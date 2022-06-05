import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs"; // ES Modules import
import { processContent } from "./libs/content";

interface FeedItem {
    url: string;
}

interface Mention {
    kg_id: string;
    count: number;
}

const client = new SQSClient({});

async function GetContent() {

    const command = new ReceiveMessageCommand({
        QueueUrl: process.env.FEED_QUEUE,
        MaxNumberOfMessages: 5 // read 5 messages
    });
    const response = await client.send(command);

    const items = response.Messages as FeedItem[];
    const results = await Promise.all(items.map(m => processContent(m.url)))
    const flat = results.reduce((item, arr) => [...arr, ...item], [])
    return flat;
}

/**
 * Can't create cron events for increments less then 1 minute, 
 * so this function will run for a minute and perform the 'GetContent' task every second
 */
exports.handler = async () => {

    let results: Mention[] = [];

    setTimeout(async () => {
        let content = await GetContent();
        results = [...results, ...content]
    }, 1000); // every 1 second

    return results; // goes nowhere

}