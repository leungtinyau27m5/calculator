import { keyMap } from '@/constants/calculatorKeys'
import { calculation } from '@/helpers/calculation'
import { isValidateKey } from '@/helpers/isValidateKey'
import { FC, HTMLAttributes, useCallback, useEffect, useReducer, useState } from 'react'
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

const reducer = (state: string, action: { type: string; payload?: any }): string => {
  const { type, payload } = action
  const lastIsNumber = (): boolean => {
    if (state === '') return false
    return state.match(/\d+$/g) ? true : false
  }
  const lastIsOperator = (): boolean => {
    if (state === '') return false
    return state.match(/[\*\-\+\/]\s$/) ? true : false
  }
  const lastIsCloseBucket = (): boolean => {
    return state.match(/\)\s$/) ? true : false
  }
  switch (type) {
    case '+':
    case '-':
    case '/':
    case '*': {
      return lastIsNumber() ? `${state} ${type} ` : lastIsCloseBucket() ? `${state}${type} ` : state
    }
    case '(': {
      return state === '' || lastIsOperator()
        ? `${state}${type} `
        : lastIsNumber()
        ? `${state} * ${type} `
        : state
    }
    case ')': {
      return lastIsNumber() ? `${state} ${type} ` : state.match(/\)\s$/) ? `${state}${type}` : state
    }
    case 'backspace': {
      let str = state
      if (str[str.length - 1] === ' ') str = str.slice(0, str.length - 3)
      else str = str.slice(0, str.length - 1)
      return str
    }
    case 'enter': {
      const val = calculation(state)
      return val
      // return `${state} = ${val}`;
    }
    case 'escape': {
      return ''
    }
    case '_': {
      return state
    }
    default:
      return lastIsCloseBucket() ? `${state} * ${type}` : `${state}${type}`
  }
}

const initState = ''

const Calculator: FC<CalCulatorProps> = ({
  variant = 'normal',
  calProps,
  displayProps,
  keyProps,
}) => {
  const keys = keyMap[variant]
  const [val, dispatchVal] = useReducer(reducer, initState)
  const [answer, setAnswer] = useState('')
  const [valHistory, setValHistory] = useState([''])
  const updateResult = useCallback(({ code = '', key = '' }) => {
    const isValid = isValidateKey({ code })
    if (!isValid) return
    dispatchVal({
      type: key.toLowerCase(),
    })
  }, [])
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
  useEffect(() => {
    if (val.match(/=/)) {
      // setValHistory((state) => [...state, val]);
    }
  }, [val])
  return (
    <Container {...calProps}>
      <DisplayResult {...displayProps}>
        <div className="top">
          <input value={valHistory[valHistory.length - 1]} readOnly />
        </div>
        <div className="input">
          <input value={val} readOnly />
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
