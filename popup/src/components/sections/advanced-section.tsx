import { css } from "@codemirror/lang-css";
import CodeMirror from "@uiw/react-codemirror";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionLabel from "@/components/ui/section-label";

import { getStorage, setStorage } from "../../utilities/chromeStorage";

import { KeyCustomCss } from "../../../../storage-keys";

function AdvancedSection() {
  const [showEditor, setShowEditor] = useState(false);
  const [cssText, setCssText] = useState("");

  const syncCss = useMemo(
    () =>
      debounce(async (css: string) => {
        try {
          await setStorage({ [KeyCustomCss]: css });
        } catch (error) {
          console.warn(error);
        }
      }, 1000),
    [],
  );

  const onChange = (value: string) => {
    const newCss = (value || "").trim();
    syncCss(newCss);
  };

  useEffect(() => () => syncCss.cancel(), [syncCss]);

  useEffect(() => {
    const setInitialSavedCss = async () => {
      try {
        const customCss = await getStorage(KeyCustomCss);
        if (customCss) {
          setCssText(customCss);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    setInitialSavedCss();
  }, []);

  return (
    <section className="flex flex-col gap-2" aria-labelledby="user-control-advanced-label">
      <div className="flex items-center justify-between">
        <SectionLabel htmlFor="user-control-advanced">Advanced</SectionLabel>
        <Button variant="ghost" size="xs" onClick={() => setShowEditor((visible) => !visible)}>
          {showEditor ? "Hide CSS Editor" : "Show CSS Editor"}
        </Button>
      </div>

      {showEditor && (
        <Card id="user-control-advanced" className="py-0">
          <CardContent className="overflow-hidden p-0">
            <CodeMirror
              className="w-full text-sm"
              theme="dark"
              value={cssText}
              placeholder="// Write custom CSS here..."
              height="300px"
              extensions={[css()]}
              onChange={onChange}
            />
          </CardContent>
        </Card>
      )}
    </section>
  );
}

export default AdvancedSection;
