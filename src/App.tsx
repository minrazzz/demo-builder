import "./App.css";
import EditorComponent from "./core/editor/EditorComponent";
import EditorNavigation from "./core/editor/EditorNavigation";
import { BrowserRouter as Router } from "react-router-dom";
import EditorSidebar from "./core/editor/sidebar";
import EditorProvider, { useEditor } from "./provider/editor-provider";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  const { dispatch, state } = useEditor();
  console.log(state);
  return (
    <>
      <Router>
        <TooltipProvider>
          <div className="fixed top-0 left-0 right-0 bottom-0 z-[20]  overflow-hidden bg-background ">
            <EditorProvider>
              <EditorNavigation />
              <div className="h-full flex justify-center">
                <EditorComponent liveMode={false} />
              </div>
              <EditorSidebar />
            </EditorProvider>
          </div>
        </TooltipProvider>
      </Router>
    </>
  );
}

export default App;
