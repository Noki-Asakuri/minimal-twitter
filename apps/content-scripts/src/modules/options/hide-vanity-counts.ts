import addStyles, { removeStyles } from "@content/modules/utilities/add-styles";
export function changeReplyCount(replyCount?: string): void {
  switch (replyCount) {
    case "hide":
      addStyles(
        "replyCount",
        `[data-testid="reply"] span { 
          visibility: hidden;
        }`,
      );
      break;
    case "show":
      removeStyles("replyCount");
      break;
  }
}
export function changeRetweetCount(retweetCount?: string): void {
  switch (retweetCount) {
    case "hide":
      addStyles(
        "retweetCount",
        `[href$="/retweets"],
        [href$="/retweets/with_comments"],
        [data-testid="retweet"] span,
        [data-testid="unretweet"] span {
          visibility: hidden; 
        }`,
      );
      break;
    case "show":
      removeStyles("retweetCount");
      break;
  }
}
export function changeLikeCount(likeCount?: string): void {
  switch (likeCount) {
    case "hide":
      addStyles(
        "likeCount",
        `[href$="/likes"][href*="/status/"],
        [data-testid="like"] span,
        [data-testid="unlike"] span {
           visibility: hidden; 
        }`,
      );
      break;
    case "show":
      removeStyles("likeCount");
      break;
  }
}
export function changeFollowingAndFollowersCounts(followCount?: string): void {
  switch (followCount) {
    case "hide":
      addStyles(
        "followCount",
        `[href$="following"][dir][role="link"],
        [href$="followers"][dir][role="link"] {
          display: none;
        }`,
      );
      break;
    case "show":
      removeStyles("followCount");
      break;
  }
}
