import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChildModel, useEditor } from "@/provider/editor-provider";
import { EditorBtns } from "@/utils/constants";
import { _hasHeightClass, _hasWidthClass } from "@/utils/reusable";
import { Trash } from "lucide-react";

type Props = {
  element: ChildModel;
};

const ImageComponent = (props: Props) => {
  const { dispatch, state } = useEditor();

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
    console.log(type);
  };

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "image")}
      onClick={handleOnClick}
      className={cn(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center h-fit mx-auto",
        props?.element?.attr?.class,
        {
          "!border-blue-500":
            state.editor.selectedElement.id === props.element.id,
          "!border-solid": state.editor.selectedElement.id === props.element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      <img
        src={props.element.attr?.href}
        className={cn("object-cover h-full w-full", {
          "h-[150px]": !_hasHeightClass(props?.element?.attr?.class as string),
          "w-[150px]": !_hasWidthClass(props?.element?.attr?.class as string),
        })}
      />

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default ImageComponent;
