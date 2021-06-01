import { keyMap } from '@/constants/calculatorKeys'
import { KeyProto } from '@/shared/keyboard.proto'

export const isValidateKey = ({
  code,
  variant = 'normal',
}: {
  code: string
  variant?: 'normal' | 'expanded'
}): boolean => {
  let isValid = false
  for (let i = 0; i < keyMap[variant].length; i++) {
    const ele: KeyProto = keyMap[variant][i]
    if (ele.keyCode.includes(code)) {
      isValid = true
      break
    }
  }
  return isValid
}
