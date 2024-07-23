import { Badge } from "@/components/ui/badge";

import { v4 } from "uuid";
import clsx from "clsx";
import Recursive from "./Recursive";
import { Trash } from "lucide-react";
import { ChildModel, useEditor } from "@/provider/editor-provider";
import { defaultClassName, EditorBtns } from "@/utils/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  element: ChildModel;
};

const Container = ({ element }: Props) => {
  const { id, child, name, tag } = element;

  const [className, setClassName] = useState("");

  console.log(className, "this is the className");

  useEffect(() => {
    setClassName(element?.attr?.class || "");
  }, [element?.attr?.class]);

  const { dispatch, state } = useEditor();

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData("componentType") as EditorBtns;
    console.log(componentType, "this is the component type");

    switch (componentType) {
      case "text":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id as string,
            elementDetails: {
              text: "Text Element",
              id: v4(),
              name: "text",
              attr: {
                ...element?.attr,
                class: element?.attr?.class + defaultClassName,
              },
            },
          },
        });
        break;

      case "section":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id as string,
            elementDetails: {
              ...element,
              child: [],
              id: v4(),
              name: "container",
              attr: {
                ...element?.attr,
                class: element?.attr?.class + defaultClassName,
              },
              tag: "section",
            },
          },
        });
        break;

      case "2Col":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id as string,
            elementDetails: {
              child: [
                {
                  child: [],
                  id: v4(),
                  name: "section",
                  attr: {
                    class: `${defaultClassName} w-full`,
                  },
                },
                {
                  child: [],
                  id: v4(),
                  name: "section",
                  attr: {
                    class: `${defaultClassName} w-full`,
                  },
                },
              ],
              id: v4(),
              name: "section",
              attr: {
                class: `${defaultClassName}`,
              },
            },
          },
        });
        break;

      case "video":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id as string,
            elementDetails: {
              attr: {
                href: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
              },
              id: v4(),
              name: "video",
              tag: "video",
            },
          },
        });
        break;
      case "link":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id as string,
            elementDetails: {
              text: "Link Element",
              attr: {
                href: "#",
                class: defaultClassName + "text-black",
              },
              id: v4(),
              name: "link",
            },
          },
        });
        break;
      case "image":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id as string,
            elementDetails: {
              attr: {
                href: "https://images.stockcake.com/public/5/f/7/5f734fa9-ab19-4be7-b532-a62d161b2f46_large/colorful-winter-gloves-stockcake.jpg",
                class: defaultClassName,
              },
              id: v4(),
              name: "image",
            },
          },
        });
        break;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  return (
    <div
      className={cn("relative  transition-all group", className, {
        "max-w-full w-full": tag === "container" || tag === "2Col",
        "h-fit": tag === "container",
        "min-h-[calc(100vh-72px)]": tag === "body",
        "p-4": tag !== "body",

        "flex flex-col md:!flex-row": tag === "2Col",
        "!border-blue-500":
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.tag !== "body",
        "!border-yellow-400 !border-4":
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.tag === "body",
        "!border-solid":
          state.editor.selectedElement.id === id && !state.editor.liveMode,
        "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
      })}
      onDrop={(e) => handleOnDrop(e, id as string)}
      onDragOver={handleDragOver}
      draggable={tag !== "body"}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "container")}
    >
      <Badge
        className={clsx(
          "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden",
          {
            block:
              state.editor.selectedElement.id === element.id &&
              !state.editor.liveMode,
          }
        )}
      >
        {element.name}
      </Badge>
      {Array.isArray(child) &&
        child.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode &&
        state.editor.selectedElement.tag !== "body" && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
            <Trash
              size={16}
              onClick={handleDeleteElement}
              className="stroke:white"
              stroke="white"
            />
          </div>
        )}
    </div>
  );
};

export default Container;
