import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeviceTypes, useEditor } from "@/provider/editor-provider";

import clsx from "clsx";
import {
  ArrowLeftCircle,
  EyeIcon,
  Laptop,
  Redo,
  Smartphone,
  Tablet,
  Undo,
} from "lucide-react";

const EditorNavigation = () => {
  const { state, dispatch } = useEditor();
  console.log(state?.editor?.previewMode);

  const handlePreviewClick = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };
  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleSaveClick = () => {
    const content = JSON.stringify(state.editor);
    console.log(content);
  };
  return (
    <TooltipProvider>
      <nav
        className={clsx(
          "border boder-b-[1px] flex items-center justify-between p-3 gap-2 transition-all ",
          { "!h-0 !p-0 overflow-hidden": state?.editor?.previewMode }
        )}
      >
        <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
          <ArrowLeftCircle />
        </aside>
        <aside>
          <Tabs
            defaultValue="desktop"
            className="w-fit"
            value={state?.editor?.device}
            onValueChange={(value) => {
              dispatch({
                type: "CHANGE_DEVICE",
                payload: { device: value as DeviceTypes },
              });
            }}
          >
            <TabsList className="grid w-full bg-transparent grid-cols-3  h-fit">
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Desktop"
                    className="data-[state=active]:bg-muted w-10 h-10 p-0"
                  >
                    <Laptop />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm">Desktop</span>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Tablet"
                    className="data-[state=active]:bg-muted w-10 h-10 p-0"
                  >
                    <Tablet />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm">Tablet</span>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Mobile"
                    className="data-[state=active]:bg-muted w-10 h-10 p-0"
                  >
                    <Smartphone />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm">mobile</span>
                </TooltipContent>
              </Tooltip>
            </TabsList>
          </Tabs>
        </aside>
        <aside className="flex items-center gap-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-sky-500  group"
            onClick={handlePreviewClick}
          >
            <EyeIcon className="group-hover:stroke-white" />
          </Button>
          <Button
            disabled={!(state?.history?.currentIndex > 0)}
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-sky-500 disabled:cursor-not-allowed"
            onClick={handleUndo}
          >
            <Undo />
          </Button>
          <Button
            disabled={
              !(
                state?.history?.currentIndex <
                state?.history?.history?.length - 1
              )
            }
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-sky-500 disabled:cursor-not-allowed"
            onClick={handleRedo}
          >
            <Redo />
          </Button>
          <Button size={"sm"} variant={"default"} onClick={handleSaveClick}>
            Save
          </Button>
        </aside>
      </nav>
    </TooltipProvider>
  );
};

export default EditorNavigation;
