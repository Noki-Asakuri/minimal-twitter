type Tweet = {
  text: string;
  url: string;
};

export default function createTweetShareLink(tweet: Tweet): string {
  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.set("text", tweet.text);
  url.searchParams.set("url", tweet.url);
  return url.toString();
}
