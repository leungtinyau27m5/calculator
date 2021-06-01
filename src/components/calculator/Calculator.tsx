import { keyMap } from '@/constants/calculatorKeys'
import { calculation, lastIsCloseBucket, lastIsNumber, lastIsOperator } from '@/helpers/calculation'
import { isValidateKey } from '@/helpers/isValidateKey'
import { FC, HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Button from '../buttons/Button'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  row-gap: 2px;
  column-gap: 2px;
`

const DisplayResult = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 1fr;
  margin-bottom: 8px;
  background-color: ${(props) => props.theme.palette.primary};
  grid-column-start: 1;
  grid-column-end: -1;
  min-height: 80px;
  color: ${(props) => props.theme.palette.contrastText};
  width: 100%;
  input {
    background: transparent;
    color: inherit;
    border: none;
    font-size: 1.25rem;
    width: 100%;
    text-align: right;
  }
  .top {
    font-size: 0.9rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    input {
      text-align: left;
      color: rgba(200, 200, 200, 1);
    }
  }
  .input {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding-left: 16px;
    padding-bottom: 2px;
    input {
      font-size: 1.25rem;
    }
  }
`
const Calculator: FC<CalCulatorProps> = ({
  variant = 'normal',
  calProps,
  displayProps,
  keyProps,
}) => {
  const keys = keyMap[variant]
  const [val, setVal] = useState('')
  const [valHistory, setValHistory] = useState([''])
  const historyRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const updateResult = useCallback(
    ({ code = '', key = '' }) => {
      const isValid = isValidateKey({ code })
      if (!isValid) return
      const type = key.toLowerCase()
      let temp = val
      switch (type) {
        case '+':
        case '-':
        case '/':
        case '*': {
          temp = lastIsNumber(temp)
            ? `${temp} ${type} `
            : lastIsCloseBucket(temp)
            ? `${temp}${type} `
            : temp
          break
        }
        case '(': {
          temp =
            temp === '' || lastIsOperator(temp)
              ? `${temp}${type} `
              : lastIsNumber(temp)
              ? `${temp} * ${type} `
              : temp
          break
        }
        case ')': {
          temp = lastIsNumber(temp)
            ? `${temp} ${type} `
            : temp.match(/\)\s$/)
            ? `${temp}${type}`
            : temp
          break
        }
        case 'backspace': {
          let str = temp
          if (str[str.length - 1] === ' ') str = str.slice(0, str.length - 3)
          else str = str.slice(0, str.length - 1)
          temp = str
          break
        }
        case 'enter': {
          const ans = calculation(temp)
          setValHistory((state) => [...state, temp + ' = ' + ans])
          temp = ans
          break
        }
        case 'escape': {
          temp = ''
          break
        }
        case '_': {
          break
        }
        case '.': {
          temp = lastIsNumber(temp) ? `${temp}.` : temp
          break
        }
        default:
          if (valHistory[valHistory.length - 1]?.split(' = ')[1] === val) {
            temp = `${type}`
          } else {
            temp = lastIsCloseBucket(temp) ? `${temp} * ${type}` : `${temp}${type}`
          }
          break
      }
      setVal(temp)
      const history = historyRef.current
      const input = inputRef.current
      history.scrollLeft = history.scrollWidth
      input.scrollLeft = input.scrollWidth
    },
    [val, valHistory]
  )
  const handleKeyDown = useCallback(
    (evt: globalThis.KeyboardEvent) => {
      const { code, key } = evt
      updateResult({ code, key })
    },
    [updateResult]
  )
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
  return (
    <Container {...calProps}>
      <DisplayResult {...displayProps}>
        <div className="top">
          <input value={valHistory[valHistory.length - 1]} readOnly ref={historyRef} />
        </div>
        <div className="input">
          <input value={val} readOnly ref={inputRef} />
        </div>
      </DisplayResult>
      {keys.map(({ label, style, val }) => (
        <Button
          key={`calculator-key-${label}`}
          {...keyProps}
          style={style}
          onClick={() => updateResult(val)}
        >
          {label}
        </Button>
      ))}
    </Container>
  )
}

export interface CalCulatorProps {
  variant?: 'normal' | 'expanded'
  displayProps?: HTMLAttributes<HTMLDivElement>
  calProps?: HTMLAttributes<HTMLDivElement>
  keyProps?: HTMLAttributes<HTMLButtonElement>
}

export default Calculator
