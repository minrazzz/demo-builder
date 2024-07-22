import { useState } from "react";
import "./App.css";
import ColorInput from "./core/ColorInput";
import EditorProvider, { useEditor } from "./provider/editor-provider";
import EditorNavigation from "./core/editor/EditorNavigation";
import EditorComponent from "./core/editor/EditorComponent";

function App() {
  const { dispatch, state } = useEditor();
  console.log(state);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[20]  overflow-hidden bg-background ">
        <EditorProvider>
          <EditorNavigation />
          <div className="h-full flex justify-center">
            <EditorComponent liveMode={false} />
          </div>
        </EditorProvider>
      </div>
    </>
  );
}

export default App;
