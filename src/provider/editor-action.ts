import { DeviceTypes, ChildModel } from "./editor-provider";

export type EditorAction =
  | {
      type: "ADD_ELEMENT";
      payload: {
        containerId: string;
        elementDetails: ChildModel;
      };
    }
  | {
      type: "UPDATE_ELEMENT";
      payload: {
        elementDetails: ChildModel;
      };
    }
  | {
      type: "DELETE_ELEMENT";
      payload: {
        elementDetails: ChildModel;
      };
    }
  | {
      type: "CHANGE_CLICKED_ELEMENT";
      payload: {
        elementDetails?:
          | ChildModel
          | {
              id: "";
              content: [];
              name: "";
              // eslint-disable-next-line @typescript-eslint/ban-types
              styles: {};
              type: null;
            };
      };
    }
  | {
      type: "CHANGE_DEVICE";
      payload: {
        device: DeviceTypes;
      };
    }
  | {
      type: "TOGGLE_PREVIEW_MODE";
    }
  | {
      type: "TOGGLE_LIVE_MODE";
      payload?: {
        value: boolean;
      };
    }
  | { type: "REDO" }
  | { type: "UNDO" }
  | {
      type: "LOAD_DATA";
      payload: {
        components: ChildModel[];
        withLive: boolean;
      };
    }
  | {
      type: "SET_FUNNELPAGE_ID";
      payload: {
        funnelPageId: string;
      };
    };
