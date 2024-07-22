import { createContext, Dispatch, useContext, useReducer } from "react";
import { EditorAction } from "./editor-action";

export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

export interface ChildModel {
  id?: string;
  name?: string;
  tag?: string;
  atrr?: {
    class?: string;
    href?: string;
  };
  text?: string;
  child?: ChildModel[];
}

interface Editor {
  details: {
    name: string;
    tag: string;
    attr?: {
      class: string;
    };
    child: {
      c: string;
    }[];
  };
  liveMode: boolean;
  components: ChildModel[];
  selectedElement: ChildModel;
  device: DeviceTypes;
  previewMode: boolean;
}

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

const initialEditorState: EditorState["editor"] = {
  details: {
    name: "",
    tag: "body",
    attr: {
      class: "",
    },
    child: [],
  },
  components: [] as ChildModel[],
  selectedElement: {} as ChildModel,
  device: "Desktop",
  previewMode: false,
  liveMode: false,
};

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};

const addAnElement = (
  editorArray: ChildModel[],
  action: EditorAction
): ChildModel[] => {
  if (action?.type !== "ADD_ELEMENT") {
    throw Error(
      "You sent the wrong action type to the Add Element editor State"
    );
  }
  return editorArray?.map((item) => {
    if (
      item?.id === action?.payload?.containerId &&
      Array.isArray(item?.child)
    ) {
      return {
        ...item,
        child: [...item.child, action?.payload.elementDetails],
      };
    } else if (Array.isArray(item.child)) {
      return {
        ...item,
        child: addAnElement(item.child, action),
      };
    }
    return item;
  });
};

const updateAnElement = (
  editorArray: ChildModel[],
  action: EditorAction
): ChildModel[] => {
  if (action.type !== "UPDATE_ELEMENT") {
    throw Error("You sent the wrong action type to the update Element State");
  }
  return editorArray?.map((item) => {
    if (item?.id === action?.payload?.elementDetails?.id) {
      return {
        ...item,
        ...action?.payload?.elementDetails,
      };
    } else if (Array.isArray(item.child)) {
      return {
        ...item,
        child: updateAnElement(item?.child, action),
      };
    }
    return item;
  });
};

const deleteAnElement = (
  editorArray: ChildModel[],
  action: EditorAction
): ChildModel[] => {
  if (action.type !== "DELETE_ELEMENT")
    throw Error(
      "You sent the wrong action type to the Delete Element editor State"
    );
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return false;
    } else if (item.child && Array.isArray(item.child)) {
      item.child = deleteAnElement(item.child, action);
    }
    return true;
  });
};

const editorReducer = (
  state: EditorState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    case "ADD_ELEMENT": {
      const addedEditorState = {
        ...state.editor,
        components: addAnElement(state.editor.components, action),
      };
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...addedEditorState }, // Save a copy of the updated state
      ];

      const newEditorState = {
        ...state,
        editor: addedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };

      return newEditorState;
    }
    case "UPDATE_ELEMENT": {
      const updatedElements = updateAnElement(state.editor.components, action);
      const UpdatedElementIsSelected =
        state.editor.selectedElement.id === action.payload.elementDetails.id;
      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: UpdatedElementIsSelected
          ? action.payload.elementDetails
          : {
              id: "",
              content: [],
              name: "",
              styles: {},
              type: null,
            },
      };

      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate }, // Save a copy of the updated state
      ];

      const updatedEditor = {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      };

      return updatedEditor;
    }

    case "DELETE_ELEMENT": {
      const updatedElementsAfterDelete = deleteAnElement(
        state.editor.components,
        action
      );
      const updatedEditorStateAfterDelete = {
        ...state.editor,
        elements: updatedElementsAfterDelete,
      };

      const updatedHistoryAfterDelete = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterDelete }, // Save a copy of the updated state
      ];
      const deletedState = {
        ...state,
        editor: updatedEditorStateAfterDelete,
        history: {
          ...state.history,
          history: updatedHistoryAfterDelete,
          currentIndex: updatedHistoryAfterDelete.length - 1,
        },
      };
      return deletedState;
    }
    case "CHANGE_CLICKED_ELEMENT": {
      const clickedState = {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementDetails || {},
        },
        history: {
          ...state.history,
          history: [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...state.editor }, // Save a copy of the current editor state
          ],
          currentIndex: state.history.currentIndex + 1,
        },
      };
      return clickedState;
    }
    case "CHANGE_DEVICE": {
      const changedDeviceState = {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      };
      return changedDeviceState;
    }
    case "TOGGLE_PREVIEW_MODE": {
      const toggleState = {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      };
      return toggleState;
    }
    case "TOGGLE_LIVE_MODE": {
      const toggleLiveMode: EditorState = {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload
            ? action.payload.value
            : !state.editor.liveMode,
        },
      };
      return toggleLiveMode;
    }
    case "REDO": {
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        const nextEditorState = { ...state.history.history[nextIndex] };
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
        return redoState;
      }
      return state;
    }
    case "UNDO": {
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        const prevEditorState = { ...state.history.history[prevIndex] };
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
        return undoState;
      }
      return state;
    }

    case "LOAD_DATA":
      return {
        ...initialState,
        editor: {
          ...initialState.editor,
          components:
            action?.payload?.components || initialEditorState.components,
          liveMode: !!action.payload.withLive,
        },
      };
    default:
      return state;
  }
};

export const EditorContext = createContext<{
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

type EditorProps = {
  children: React.ReactNode;
};

const EditorProvider = (props: EditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider");
  }
  return context;
};

export default EditorProvider;
