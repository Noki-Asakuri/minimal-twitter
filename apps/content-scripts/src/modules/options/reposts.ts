import selectors from "@content/selectors";
import {
  KeyHideOldReposts,
  KeyHideReactionTweets,
  KeyHideSameAuthorReposts,
} from "@minimal-twitter/shared";
import { getStorage } from "@content/modules/utilities/storage";
const HIDDEN_REPOST_CLASS = "mt-hidden-repost";
const SAME_AUTHOR_REPOST_CLASS = "mt-hidden-same-author-repost";
const OLD_REPOST_CLASS = "mt-hidden-old-repost";
const REACTION_TWEET_CLASS = "mt-hidden-reaction-tweet";
const ONE_YEAR_IN_MS = 365 * 24 * 60 * 60 * 1000;
type RepostSettings = Partial<{
  hideSameAuthorReposts: string;
  hideOldReposts: string;
  hideReactionTweets: string;
}>;
export async function changeRepostFilters(settings: RepostSettings = {}): Promise<void> {
  const savedSettings = await getStorage([
    KeyHideSameAuthorReposts,
    KeyHideOldReposts,
    KeyHideReactionTweets,
  ]);
  filterReposts({
    hideSameAuthorReposts:
      settings.hideSameAuthorReposts ?? savedSettings[KeyHideSameAuthorReposts],
    hideOldReposts: settings.hideOldReposts ?? savedSettings[KeyHideOldReposts],
    hideReactionTweets: settings.hideReactionTweets ?? savedSettings[KeyHideReactionTweets],
  });
}
export function filterReposts(settings: RepostSettings = {}): void {
  const hideSameAuthorReposts = settings.hideSameAuthorReposts === "on";
  const hideOldReposts = settings.hideOldReposts === "on";
  const hideReactionTweets = settings.hideReactionTweets === "on";
  for (const tweet of document.querySelectorAll<HTMLElement>(selectors.tweet)) {
    const shouldHideSameAuthorRepost = hideSameAuthorReposts && isSameAuthorRepost(tweet);
    const shouldHideOldRepost = hideOldReposts && isOldRepost(tweet);
    const shouldHideReactionTweet = hideReactionTweets && isReactionTweet(tweet);
    const wasHiddenByRepostFilter = tweet.classList.contains(HIDDEN_REPOST_CLASS);
    const shouldHideTweet =
      shouldHideSameAuthorRepost || shouldHideOldRepost || shouldHideReactionTweet;
    tweet.classList.toggle(SAME_AUTHOR_REPOST_CLASS, shouldHideSameAuthorRepost);
    tweet.classList.toggle(OLD_REPOST_CLASS, shouldHideOldRepost);
    tweet.classList.toggle(REACTION_TWEET_CLASS, shouldHideReactionTweet);
    tweet.classList.toggle(HIDDEN_REPOST_CLASS, shouldHideTweet);
    if (shouldHideTweet) {
      tweet.style.display = "none";
    } else if (wasHiddenByRepostFilter) {
      tweet.style.display = "";
    }
  }
}
function isSameAuthorRepost(tweet: HTMLElement): boolean {
  const repostUsernames = getRepostUsernames(tweet);
  if (!repostUsernames.length) return false;
  const authorUsername = getTweetAuthorUsername(tweet);
  return Boolean(authorUsername && repostUsernames.includes(authorUsername));
}
function isOldRepost(tweet: HTMLElement): boolean {
  if (!isRepost(tweet)) return false;
  const publishedAt = getTweetPublishedAt(tweet);
  if (!publishedAt) return false;
  return Date.now() - publishedAt.getTime() > ONE_YEAR_IN_MS;
}
function getRepostUsernames(tweet: HTMLElement): string[] {
  return getRepostContextLinks(tweet)
    .map((link) => getUsernameFromHref(link.getAttribute("href")))
    .filter((username): username is string => Boolean(username));
}
function isRepost(tweet: HTMLElement): boolean {
  return getRepostContextLinks(tweet).length > 0 || getRepostContextElements(tweet).length > 0;
}
function isReactionTweet(tweet: HTMLElement): boolean {
  return Array.from(
    tweet.querySelectorAll('[data-testid="videoReactionAttribution"], [aria-label]'),
  ).some(
    (element) =>
      includesReactionText(element.textContent) ||
      includesReactionText(element.getAttribute("aria-label")),
  );
}
function getRepostContextLinks(tweet: HTMLElement): HTMLAnchorElement[] {
  const linksFromContextElements = getRepostContextElements(tweet).flatMap((element) =>
    Array.from(element.querySelectorAll<HTMLAnchorElement>('a[href^="/"][role="link"]')),
  );
  const linksFromContextAncestors = Array.from(
    tweet.querySelectorAll<HTMLAnchorElement>('a[href^="/"][role="link"]'),
  ).filter((link) => hasRepostContextAncestor(tweet, link));
  const linksWithRepostText = Array.from(
    tweet.querySelectorAll<HTMLAnchorElement>('a[href^="/"][role="link"]'),
  ).filter(
    (link) =>
      includesRepostText(link.textContent) || includesRepostText(link.getAttribute("aria-label")),
  );
  return Array.from(
    new Set([...linksFromContextElements, ...linksFromContextAncestors, ...linksWithRepostText]),
  );
}
function getRepostContextElements(tweet: HTMLElement): Element[] {
  const time = tweet.querySelector("time");
  return Array.from(tweet.querySelectorAll('[data-testid="socialContext"], [aria-label]')).filter(
    (element) => {
      if (time && element.contains(time)) return false;
      return (
        includesRepostText(element.textContent) ||
        includesRepostText(element.getAttribute("aria-label"))
      );
    },
  );
}
function hasRepostContextAncestor(tweet: HTMLElement, link: HTMLAnchorElement): boolean {
  const time = tweet.querySelector("time");
  let ancestor = link.parentElement;
  while (ancestor && ancestor !== tweet) {
    if (!time || !ancestor.contains(time)) {
      if (
        includesRepostText(ancestor.textContent) ||
        includesRepostText(ancestor.getAttribute("aria-label"))
      )
        return true;
    }
    ancestor = ancestor.parentElement;
  }
  return false;
}
function includesRepostText(text: string | null | undefined): boolean {
  const normalizedText = text?.toLowerCase() || "";
  return normalizedText.includes("reposted") || normalizedText.includes("retweeted");
}
function includesReactionText(text: string | null | undefined): boolean {
  return text?.trim().toLowerCase().startsWith("reaction to") || false;
}
function getTweetAuthorUsername(tweet: HTMLElement): string | null {
  const time = tweet.querySelector("time");
  const statusLink = time?.closest('a[href*="/status/"]');
  return getUsernameFromHref(statusLink?.getAttribute("href"));
}
function getTweetPublishedAt(tweet: HTMLElement): Date | null {
  const datetime = tweet.querySelector("time")?.getAttribute("datetime");
  if (!datetime) return null;
  const publishedAt = new Date(datetime);
  return Number.isNaN(publishedAt.getTime()) ? null : publishedAt;
}
function getUsernameFromHref(href: string | null | undefined): string | null {
  if (!href) return null;
  const [username] = href
    .replace(/^https?:\/\/(?:twitter|x)\.com/i, "")
    .split("?")[0]
    .split("/")
    .filter(Boolean);
  if (!username || username === "i" || username === "search" || username === "home") return null;
  return username.toLowerCase();
}
