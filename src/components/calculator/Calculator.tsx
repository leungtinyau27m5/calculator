import { keyMap } from '@/constants/calculatorKeys'
import { calculation, lastIsCloseBucket, lastIsNumber, lastIsOperator } from '@/helpers/calculation'
import { isValidateKey } from '@/helpers/isValidateKey'
import {
  FC,
  HTMLAttributes,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import Button from '@/components/buttons/Button'

const Container = styled.div<CalculatorContainerProps>`
  .wrapper {
    display: ${(props) => (props.isMinize ? 'none' : 'grid')};
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    row-gap: 2px;
    column-gap: 2px;
  }
  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 400px;
  }
  .minize-calculator {
    position: absolute;
    height: 36px;
    top: -40px;
    right: 0;
    background-color: rgba(128, 128, 128, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
  }
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
  enableDrag = false,
}) => {
  const keys = keyMap[variant]
  const [val, setVal] = useState('')
  const [isMinize, setMinize] = useState(false)
  const [valHistory, setValHistory] = useState([''])
  const container = useRef<HTMLDivElement>(null)
  const historyRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 40 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDrag, setIsDrag] = useState(false)
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
  const hanldeMinize: MouseEventHandler<HTMLButtonElement> = (evt): void => {
    evt.preventDefault()
    evt.stopPropagation()
    setMinize((state) => !state)
  }
  const handleKeyDown = useCallback(
    (evt: globalThis.KeyboardEvent) => {
      const { code, key } = evt
      updateResult({ code, key })
    },
    [updateResult]
  )
  const handleMouseEnter: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (evt): void => {
    evt.preventDefault()
    evt.stopPropagation()
    container.current.style.cursor = 'all-scroll'
  }
  const handleDragStart: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (evt): void => {
    if (!enableDrag) return
    evt.preventDefault()
    evt.stopPropagation()
    setIsDrag(true)
    const offset = container.current.getClientRects()[0]
    const relX = evt.pageX - offset.left
    const relY = evt.pageY - offset.top
    setOffset({ x: relX, y: relY })
  }
  const handleDragEnd: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (evt): void => {
    evt.preventDefault()
    evt.stopPropagation()
    setIsDrag(false)
  }
  const handleDragging: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (evt): void => {
    if (!isDrag) return
    const parentRect = container.current.parentElement.getBoundingClientRect()
    const containerRect = container.current.getBoundingClientRect()
    let newX = evt.pageX - offset.x
    let newY = evt.pageY - offset.y
    if (newX < 0) newX = 0
    if (newX + containerRect.width > parentRect.width) newX = parentRect.width - containerRect.width
    if (newY < 40) newY = 40
    if (newY + containerRect.height > parentRect.height)
      newY = parentRect.height - containerRect.height
    setPosition({
      x: newX,
      y: newY,
    })
    evt.preventDefault()
    evt.stopPropagation()
  }
  useEffect(() => {
    if (!isDrag) {
      container.current.style.cursor = 'default'
    }
  }, [isDrag])
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    const rect = container.current.getBoundingClientRect()
    const parent = container.current.parentElement.getBoundingClientRect()
    setPosition((state) => ({
      ...state,
      x: parent.width - rect.width,
      y: parent.height - rect.height
    }))
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
  return (
    <Container
      {...calProps}
      ref={container}
      style={Object.assign(
        calProps.style,
        enableDrag
          ? {
              position: 'absolute',
              left: position.x,
              top: position.y,
            }
          : {}
      )}
      isMinize={isMinize}
    >
      <div className="wrapper">
        <DisplayResult
          {...displayProps}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseMove={handleDragging}
        >
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
      </div>
      <Button
        className="minize-calculator"
        onClick={hanldeMinize}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDragging}
      >
        {isMinize ? '<' : '>'}
      </Button>
    </Container>
  )
}

export interface CalCulatorProps {
  variant?: 'normal' | 'expanded'
  displayProps?: HTMLAttributes<HTMLDivElement>
  calProps?: HTMLAttributes<HTMLDivElement>
  keyProps?: HTMLAttributes<HTMLButtonElement>
  enableDrag?: boolean
}

export interface CalculatorContainerProps {
  isMinize?: boolean
}

export default Calculator
