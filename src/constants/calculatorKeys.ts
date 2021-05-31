import { KeyMap } from "@/shared/keyboard.proto";

export const keyMap: KeyMap = {
  normal: [
    {
      label: 0,
      keyCode: ["Numpad0", "Digit0"],
      style: {
        gridColumnStart: 1,
      },
      val: {
        code: "Numpad0",
        key: "0",
      },
    },
    {
      label: 1,
      keyCode: ["Numpad1", "Digit1"],
      style: {
        gridRowStart: 5,
        gridColumnStart: 1,
      },
      val: {
        code: "Numpad1",
        key: "1",
      },
    },
    {
      label: 2,
      keyCode: ["Numpad2", "Digit2"],
      style: {
        gridRowStart: 5,
        gridColumnStart: 2,
      },
      val: {
        code: "Numpad2",
        key: "2",
      },
    },
    {
      label: 3,
      keyCode: ["Numpad3", "Digit3"],
      style: {
        gridRowStart: 5,
        gridColumnStart: 3,
      },
      val: {
        code: "Numpad3",
        key: "3",
      },
    },
    {
      label: 4,
      keyCode: ["Numpad4", "Digit4"],
      style: {
        gridRowStart: 4,
        gridColumnStart: 1,
      },
      val: {
        code: "Numpad4",
        key: "4",
      },
    },
    {
      label: 5,
      keyCode: ["Numpad5", "Digit5"],
      style: {
        gridRowStart: 4,
        gridColumnStart: 2,
      },
      val: {
        code: "Numpad5",
        key: "5",
      },
    },
    {
      label: 6,
      keyCode: ["Numpad6", "Digit6"],
      style: {
        gridRowStart: 4,
        gridColumnStart: 3,
      },
      val: {
        code: "Numpad6",
        key: "6",
      },
    },
    {
      label: 7,
      keyCode: ["Numpad7", "Digit7"],
      style: {
        gridRowStart: 3,
        gridColumnStart: 1,
      },
      val: {
        code: "Numpad7",
        key: "7",
      },
    },
    {
      label: 8,
      keyCode: ["Numpad8", "Digit8"],
      style: {
        gridRowStart: 3,
        gridColumnStart: 2,
      },
      val: {
        code: "Numpad8",
        key: "8",
      },
    },
    {
      label: 9,
      keyCode: ["Numpad9", "Digit9"],
      style: {
        gridRowStart: 3,
        gridColumnStart: 3,
      },
      val: {
        code: "Numpad9",
        key: "9",
      },
    },
    {
      label: "00",
      keyCode: ["Custom00"],
      val: {
        code: "Custom00",
        key: "00",
      },
    },
    {
      label: ".",
      keyCode: ["NumpadDecimal", "Period"],
      val: {
        code: "NumpadDecimal",
        key: ".",
      },
    },
    {
      label: "➖",
      keyCode: ["Minus", "NumpadSubtract"],
      style: {
        gridColumnStart: 4,
        gridRowStart: 3,
      },
      val: {
        code: "Minus",
        key: "-",
      },
    },
    {
      label: "➕",
      keyCode: ["NumpadAdd", "Equal"],
      style: {
        gridColumnStart: 4,
        gridRowStart: 4,
      },
      val: {
        code: "NumpadAdd",
        key: "+",
      },
    },
    {
      label: "=",
      keyCode: ["NumpadEnter", "Enter", "Equal"],
      style: {
        gridColumnStart: -2,
        gridRowStart: 5,
        gridRowEnd: 7,
        background: "#2196F3",
      },
      val: {
        code: "NumpadEnter",
        key: "enter",
      },
    },
    {
      label: "✖",
      keyCode: ["Digit8", "NumpadMultiply"],
      style: {
        gridColumnStart: 3,
        gridRowStart: 2,
      },
      val: {
        code: "Digit8",
        key: "*",
      },
    },
    {
      label: "➗",
      keyCode: ["Slash", "NumpadDivide"],
      style: {
        gridColumnStart: 2,
        gridRowStart: 2,
      },
      val: {
        code: "NumpadDivide",
        key: "/",
      },
    },
    {
      label: "DEL",
      keyCode: ["Backspace"],
      style: {
        gridColumnStart: -2,
        gridRowStart: 2,
        background: "#FF9800",
      },
      val: {
        code: "Backspace",
        key: "backspace",
      },
    },
    {
      label: "CLEAR",
      keyCode: ["Escape"],
      style: {
        gridColumnStart: 1,
        gridRowStart: 2,
        background: "#E91E63",
      },
      val: {
        code: "Escape",
        key: "escape",
      },
    },
  ],
  expanded: [
    {
      label: 0,
      keyCode: ["Numpad0", "Digit0"],
      style: {
        gridColumnStart: 1,
      },
      val: {
        code: "Digit0",
        key: "0",
      },
    },
    {
      label: 1,
      keyCode: ["Numpad1", "Digit1"],
      style: {
        gridRowStart: 6,
        gridColumnStart: 1,
      },
      val: {
        code: "Numpad1",
        key: "1",
      },
    },
    {
      label: 2,
      keyCode: ["Numpad2", "Digit2"],
      style: {
        gridRowStart: 6,
        gridColumnStart: 2,
      },
      val: {
        code: "Numpad2",
        key: "2",
      },
    },
    {
      label: 3,
      keyCode: ["Numpad3", "Digit3"],
      style: {
        gridRowStart: 6,
        gridColumnStart: 3,
      },
      val: {
        code: "Numpad3",
        key: "3",
      },
    },
    {
      label: 4,
      keyCode: ["Numpad4", "Digit4"],
      style: {
        gridRowStart: 5,
        gridColumnStart: 1,
      },
      val: {
        code: "Numpad4",
        key: "4",
      },
    },
    {
      label: 5,
      keyCode: ["Numpad5", "Digit5"],
      style: {
        gridRowStart: 5,
        gridColumnStart: 2,
      },
      val: {
        code: "Numpad5",
        key: "5",
      },
    },
    {
      label: 6,
      keyCode: ["Numpad6", "Digit6"],
      style: {
        gridRowStart: 5,
        gridColumnStart: 3,
      },
      val: {
        code: "Numpad6",
        key: "6",
      },
    },
    {
      label: 7,
      keyCode: ["Numpad7", "Digit7"],
      style: {
        gridRowStart: 4,
        gridColumnStart: 1,
      },
      val: {
        code: "Numpad7",
        key: "7",
      },
    },
    {
      label: 8,
      keyCode: ["Numpad8", "Digit8"],
      style: {
        gridRowStart: 4,
        gridColumnStart: 2,
      },
      val: {
        code: "Numpad8",
        key: "8",
      },
    },
    {
      label: 9,
      keyCode: ["Numpad9", "Digit9"],
      style: {
        gridRowStart: 4,
        gridColumnStart: 3,
      },
      val: {
        code: "Numpad9",
        key: "9",
      },
    },
    {
      label: "00",
      keyCode: ["Custom00"],
      val: {
        code: "Custom00",
        key: "00",
      },
    },
    {
      label: ".",
      keyCode: ["NumpadDecimal", "Period"],
      val: {
        code: "NumpadDecimal",
        key: ".",
      },
    },
    {
      label: "➖",
      keyCode: ["Minus", "NumpadSubtract"],
      style: {
        gridColumnStart: 4,
        gridRowStart: 4,
      },
      val: {
        code: "Minus",
        key: "-",
      },
    },
    {
      label: "➕",
      keyCode: ["NumpadAdd", "Equal"],
      style: {
        gridColumnStart: 4,
        gridRowStart: 5,
      },
      val: {
        code: "NumpadAdd",
        key: "+",
      },
    },
    {
      label: "=",
      keyCode: ["NumpadEnter", "Enter", "Equal"],
      style: {
        gridColumnStart: -2,
        gridRowStart: 6,
        gridRowEnd: 8,
        background: "#2196F3",
      },
      val: {
        code: "NumpadEnter",
        key: "enter",
      },
    },
    {
      label: "✖",
      keyCode: ["Digit8", "NumpadMultiply"],
      style: {
        gridColumnStart: 4,
        gridRowStart: 3,
      },
      val: {
        code: "NumpadMultiply",
        key: "*",
      },
    },
    {
      label: "➗",
      keyCode: ["Slash", "NumpadDivide"],
      style: {
        gridColumnStart: 3,
        gridRowStart: 3,
      },
      val: {
        code: "NumpadDivide",
        key: "/",
      },
    },
    {
      label: "DEL",
      keyCode: ["Backspace"],
      style: {
        gridColumnStart: -2,
        gridRowStart: 2,
        background: "#FF9800",
      },
      val: {
        code: "Backspace",
        key: "backspace",
      },
    },
    {
      label: "CLEAR",
      keyCode: ["Escape"],
      style: {
        gridColumnStart: 1,
        gridRowStart: 2,
        background: "#E91E63",
      },
      val: {
        code: "Escape",
        key: "escape",
      },
    },
    {
      label: "(",
      keyCode: ["Digit9"],
      style: {
        gridRowStart: 2,
        gridColumnStart: 2,
      },
      val: {
        code: "Digit9",
        key: "(",
      },
    },
    {
      label: ")",
      keyCode: ["Digit0"],
      style: {
        gridRowStart: 2,
        gridColumnStart: 3,
      },
      val: {
        code: "Digit0",
        key: ")",
      },
    },
    {
      label: "←",
      keyCode: [],
      style: {
        gridRowStart: 3,
        gridColumnStart: 1,
      },
      val: {
        code: "ArrowLeft",
        key: "arrowleft",
      },
    },
    {
      label: "→",
      keyCode: [],
      style: {
        gridRowStart: 3,
        gridColumnStart: 2,
      },
      val: {
        code: "ArrowRight",
        key: "arrowright",
      },
    },
  ],
};

export const specialCase = [
  "/",
  "*",
  ".",
  "+",
  "-",
  "=",
  "ArrowRight",
  "ArrowLeft",
  "Enter",
  "Backspace",
  "(",
  ")",
];
