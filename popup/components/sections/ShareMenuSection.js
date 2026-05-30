import { KeySendViaChatShareMenu, KeySendViaDirectMessageShareMenu, KeySharePostViaShareMenu } from "../../../storage-keys";
import SectionLabel from "../ui/SectionLabel";
import SwitchControl from "../ui/SwitchControl";

const ShareMenuSection = () => (
  <section className="flex flex-col gap-y-2">
    <SectionLabel htmlFor="user-control-share-menu">Share Menu</SectionLabel>
    <div id="user-control-share-menu">
      <form className="flex flex-col items-center justify-between px-4 dark:bg-x-bgTwoDark bg-x-bgTwo rounded-2xl">
        <div className="w-full py-4">
          <div className="flex flex-col gap-y-4">
            <SwitchControl label="Send via Direct Message" storageKey={KeySendViaDirectMessageShareMenu} />
            <SwitchControl label="Send via Chat" storageKey={KeySendViaChatShareMenu} />
            <SwitchControl label="Share post via..." storageKey={KeySharePostViaShareMenu} />
          </div>
        </div>
      </form>
    </div>
  </section>
);

export default ShareMenuSection;
