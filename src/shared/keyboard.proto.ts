import { CSSProperties } from "react";

export interface KeyProto {
  label: string | number;
  keyCode: string | Array<string>;
  shiftKeyNeeded?: boolean;
  width?: number;
  height?: number;
  style?: CSSProperties;
  val: {
    code: string;
    key: string;
  }
}

export type KeyMap = {
  normal: Array<KeyProto>;
  expanded: Array<KeyProto>;
};
