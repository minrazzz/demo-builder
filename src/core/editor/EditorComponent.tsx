import { Button } from "@/components/ui/button";
import { useEditor } from "@/provider/editor-provider";
// import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { EyeOff } from "lucide-react";
import { useEffect } from "react";
// import Recursive from "./editor-child-components/Recursive";

const EditorComponent = ({ liveMode }: { liveMode?: boolean }) => {
  const { state, dispatch } = useEditor();

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [liveMode]);

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  const handleUnpreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  console.log(state?.editor?.components);

  return (
    <div
      className={clsx(
        "use-automation-zoom-in h-full  mr-[385px] bg-background transition-all rounded-md  border",
        {
          "!p-0 !mr-0":
            state.editor.previewMode === true || state.editor.liveMode === true,
          "!w-[850px]": state.editor.device === "Tablet",
          "!w-[420px]": state.editor.device === "Mobile",
          "w-full": state.editor.device === "Desktop",
        }
      )}
      onClick={handleClick}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-6 h-6 hover:bg-sky-500 p-[2px] fixed top-0 left-0 z-[100] group"
          onClick={handleUnpreview}
        >
          <EyeOff className="group-hover:stroke-white" />
        </Button>
      )}
      {/* {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))} */}
    </div>
  );
};

export default EditorComponent;
