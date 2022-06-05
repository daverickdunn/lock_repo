import { SPORTS, PUBLISHERS } from "./mock_data";

interface Feed {
  id: number;
  url: string;
}
interface FeedItem {
  url: string;
}

const getNextFeed = async () => {
  const availableFeed = Math.random();
  if (availableFeed > 0.666) return null;
  const publisherIndex = Math.floor(Math.random() * PUBLISHERS.length);
  const sportIndex = Math.floor(Math.random() * SPORTS.length);
  const publisher = PUBLISHERS[publisherIndex];
  const sport = SPORTS[sportIndex];
  return <Feed>{
    id: publisherIndex + 1,
    url: `${publisher.domain}/${sport}/rss`,
  };
};
const getFeedItems = async (url: string) => {
  // new story every 5 minutes
  const current = Math.floor(Date.now() / 300000);
  const baseUrl = url.split("/rss")[0];
  return Array(10)
    .fill(0)
    .map((_, i) => {
      return <FeedItem>{
        url: `${baseUrl}/news-${current - 9 + i}.html`,
      };
    });
};

export const processFeed = async () => {
  const nextFeed = await getNextFeed();
  if (nextFeed != null) {
    const items = await getFeedItems(nextFeed.url);
    return items;
  }
  return null;
};
