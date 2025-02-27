import { EditorBtns } from "@/utils/constants";
import { Image } from "lucide-react";

const ImagePlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "image")}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Image size={40} className="text-muted-forgroeund" />
    </div>
  );
};

export default ImagePlaceholder;
