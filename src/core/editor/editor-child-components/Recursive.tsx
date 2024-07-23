import { ChildModel } from "@/provider/editor-provider";
import TextComponent from "./Text";
import Container from "./Container";
import VideoComponent from "./VideoComponent";
import LinkComponent from "./LinkComponent";
import ImageComponent from "./ImageComponent";

type props = {
  element: ChildModel;
};

const Recursive = ({ element }: props) => {
  console.log(element.name);
  switch (element.name) {
    case "text":
      return <TextComponent element={element} />;
    case "container":
      return <Container element={element} />;
    case "section":
      return <Container element={element} />;
    case "div":
      return <Container element={element} />;
    case "body":
      return <Container element={element} />;
    case "video":
      return <VideoComponent element={element} />;
    case "link":
      return <LinkComponent element={element} />;
    case "image":
      return <ImageComponent element={element} />;

    default:
      return null;
  }
};

export default Recursive;
