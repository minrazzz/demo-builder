import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs } from "@/components/ui/tabs";

import clsx from "clsx";

import { TabsContent } from "@radix-ui/react-tabs";
import { useEditor } from "@/provider/editor-provider";

const EditorSidebar = () => {
  const { state, dispatch } = useEditor();
  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full" defaultValue="Settings">
        <SheetContent
          showX={false}
          side={"right"}
          className={clsx(
            "mt-[73.6px] w-16 z-[80] shadow-none p-0 border-r-[2px] border-r-gray-100 focus:outline-none outline-none transition-all overflow-hidden",
            { hidden: state?.editor?.previewMode }
          )}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          showX={false}
          side={"right"}
          className={clsx(
            "mt-[73.6px] w-80 z-[40] shadow-none p-0 mr-16 bg-background h-full  border-l-[2px] border-l-gray-100 focus:outline-none outline-none transition-all overflow-hidden",
            { hidden: state?.editor?.previewMode }
          )}
        >
          <div className="grid gap-4 h-full pb-36 overflow-scroll">
            <TabsContent value="Settings">
              <SheetHeader className="text-left p-5">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                  Show your creativity! You can customize every component as you
                  want
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>
            <TabsContent value="Components">
              <SheetHeader className="text-left p-5">
                <SheetTitle>Components</SheetTitle>
                <SheetDescription>
                  You can drag and drop on the canvas
                </SheetDescription>
              </SheetHeader>
              <ComponentsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
};

export default EditorSidebar;
