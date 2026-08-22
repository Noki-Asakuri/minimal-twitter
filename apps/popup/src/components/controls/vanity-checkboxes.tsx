import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CheckboxControl } from "@/components/ui/checkboxes";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { getStorage, setStorage } from "@/utilities/chromeStorage";

import {
  KeyAllVanity,
  KeyFollowCount,
  KeyLikeCount,
  KeyReplyCount,
  KeyRetweetCount,
} from "@minimal-twitter/shared";

type VanityType = "all" | "reply" | "retweet" | "like" | "follow";

function VanityCheckboxes() {
  const [showVanityCheckboxes, setShowVanityCheckboxes] = useState(false);
  const [hideAll, setHideAll] = useState(false);
  const [hideReply, setHideReply] = useState(false);
  const [hideRetweet, setHideRetweet] = useState(false);
  const [hideLike, setHideLike] = useState(false);
  const [hideFollow, setHideFollow] = useState(false);

  useEffect(() => {
    const getUserDefaultAll = async () => {
      try {
        const userDefaultAll = await getStorage(KeyAllVanity);
        if (userDefaultAll) {
          setHideAll(userDefaultAll === "hide" ? true : false);
        }
      } catch (error) {
        console.warn(error);
      }
    };
    const getUserDefaultReply = async () => {
      try {
        const userDefaultReply = await getStorage(KeyReplyCount);
        if (userDefaultReply) {
          setHideReply(userDefaultReply === "hide");
        }
      } catch (error) {
        console.warn(error);
      }
    };
    const getUserDefaultLike = async () => {
      try {
        const userDefaultLike = await getStorage(KeyLikeCount);
        if (userDefaultLike) {
          setHideLike(userDefaultLike === "hide");
        }
      } catch (error) {
        console.warn(error);
      }
    };
    const getUserDefaultRetweet = async () => {
      try {
        const userDefaultRetweet = await getStorage(KeyRetweetCount);
        if (userDefaultRetweet) {
          setHideRetweet(userDefaultRetweet === "hide");
        }
      } catch (error) {
        console.warn(error);
      }
    };
    const getUserDefaultFollow = async () => {
      try {
        const userDefaultFollow = await getStorage(KeyFollowCount);
        if (userDefaultFollow) {
          setHideFollow(userDefaultFollow === "hide");
        }
      } catch (error) {
        console.warn(error);
      }
    };

    getUserDefaultAll();
    getUserDefaultReply();
    getUserDefaultLike();
    getUserDefaultRetweet();
    getUserDefaultFollow();
  }, []);

  const onCheckedChange = async (type: VanityType, checked: boolean) => {
    switch (type) {
      case "all":
        setHideAll(checked);
        setHideReply(checked);
        setHideRetweet(checked);
        setHideLike(checked);
        setHideFollow(checked);
        try {
          await setStorage({
            [KeyAllVanity]: checked ? "hide" : "show",
            [KeyReplyCount]: checked ? "hide" : "show",
            [KeyRetweetCount]: checked ? "hide" : "show",
            [KeyLikeCount]: checked ? "hide" : "show",
            [KeyFollowCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;

      case "reply":
        setHideReply(checked);
        try {
          await setStorage({
            [KeyReplyCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;

      case "retweet":
        setHideRetweet(checked);
        try {
          await setStorage({
            [KeyRetweetCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;

      case "like":
        setHideLike(checked);
        try {
          await setStorage({
            [KeyLikeCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;

      case "follow":
        setHideFollow(checked);
        try {
          await setStorage({
            [KeyFollowCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;
    }
  };

  return (
    <Collapsible
      open={showVanityCheckboxes}
      onOpenChange={setShowVanityCheckboxes}
      className="flex flex-col gap-3"
    >
      <CheckboxControl
        id="all"
        label="Engagements Under Posts"
        labelExtras={
          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={
                  showVanityCheckboxes ? "Hide engagement options" : "Show engagement options"
                }
                title={showVanityCheckboxes ? "Hide options" : "Show options"}
              />
            }
          >
            <ChevronDownIcon className="transition-transform duration-150 group-data-panel-open/button:rotate-180" />
          </CollapsibleTrigger>
        }
        checked={hideAll}
        onCheckedChange={(checked) => onCheckedChange("all", checked)}
        crossedIcon
      />
      <CollapsibleContent className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-150 ease-out data-ending-style:h-0 data-starting-style:h-0">
        <div className="ml-2 flex flex-col gap-3 border-l border-border pl-3 pb-1">
          <CheckboxControl
            crossedIcon
            id="reply"
            label="Reply Count from Tweets"
            onCheckedChange={(checked) => onCheckedChange("reply", checked)}
            checked={hideReply}
          />
          <CheckboxControl
            crossedIcon
            id="retweet"
            label="Retweet Count from Tweets"
            onCheckedChange={(checked) => onCheckedChange("retweet", checked)}
            checked={hideRetweet}
          />
          <CheckboxControl
            crossedIcon
            id="like"
            label="Like Count from Tweets"
            onCheckedChange={(checked) => onCheckedChange("like", checked)}
            checked={hideLike}
          />
          <CheckboxControl
            crossedIcon
            id="follow"
            label="Follower/Following Count"
            onCheckedChange={(checked) => onCheckedChange("follow", checked)}
            checked={hideFollow}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default VanityCheckboxes;
