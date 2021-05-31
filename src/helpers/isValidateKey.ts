import { keyMap, specialCase } from "@/constants/calculatorKeys";
import { KeyProto } from "@/shared/keyboard.proto";

export const isValidateKey = ({ code, variant = "normal" }): boolean => {
  let isValid = false;
  for (let i = 0; i < keyMap[variant].length; i++) {
    let ele: KeyProto = keyMap[variant][i];
    if (ele.keyCode.includes(code)) {
      isValid = true;
      break;
    }
  }
  return isValid;
};
