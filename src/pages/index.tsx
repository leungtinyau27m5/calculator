import Button from '@/components/buttons/Button'
// import Calculator from '@/components/calculator/Calculator'
import FormControl from '@/components/formControl/FormControl'
import { FC, useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${(props) => props.theme.palette.paper};
  width: 100%;
  height: 100%;
  .cal-property {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
    .test-property-rate {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      max-width: 420px;
      column-gap: 4px;
      row-gap: 8px;
      margin-left: auto;
      margin-right: auto;
    }
    .cal-result {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.palette.contrastText};
      @media (max-width: 768px) {
        flex-direction: column;
      }
      .result-tables {
        width: 100%;
        max-width: 520px;
        .table {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
          & > div {
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 12px;
            border-collapse: collapse;
            min-width: 120px;
            &:nth-child(1) {
              border-top-left-radius: 8px;
            }
            &:nth-child(2) {
              border-top-right-radius: 8px;
            }
            &:nth-last-child(1) {
              border-bottom-right-radius: 8px;
            }
            &:nth-last-child(2) {
              border-bottom-left-radius: 8px;
            }
            &:nth-child(odd) {
              background-color: #f7f7f7;
              border: 1px solid white;
              color: black;
            }
          }
        }
      }
    }
  }
`
const initFormEle = {
  propertyValue: 600,
  loanRate: 60,
  loanAmount: 360,
  loanPeriod: 25,
  interestRate: 3,
}

const formEleReducer = (
  state: PropertyCalculationState,
  action: { type: keyof PropertyCalculationState; payload?: number }
): PropertyCalculationState => {
  const { type, payload } = action
  const { loanRate, propertyValue } = state
  switch (type) {
    case 'propertyValue': {
      return { ...state, propertyValue: payload, loanAmount: (payload * loanRate) / 100 }
    }
    case 'loanRate': {
      if (payload < 1 || payload > 100) return state
      return { ...state, loanRate: payload, loanAmount: (payload * propertyValue) / 100 }
    }
    case 'loanAmount': {
      if (payload > propertyValue) return state
      return { ...state, loanAmount: payload, loanRate: (payload / propertyValue) * 100 }
    }
    case 'interestRate': {
      if (payload < 1 || payload > 10) return state
      return { ...state, interestRate: payload }
    }
    case 'loanPeriod': {
      if (payload < 1) return state
      return { ...state, loanPeriod: payload }
    }
    default:
      return state
  }
}

const Home: FC = () => {
  const [formEle, dispacthFormEle] = useReducer(formEleReducer, initFormEle)
  const [result, setResult] = useState({
    monthlyContribution: 0,
    firstPayment: 0,
    loanAmount: 0,
    totalInterest: 0
  })
  const [helperText, setHelperText] = useState('')
  const hanldeOnChange = (key: keyof PropertyCalculationState, val: string): void => {
    if (!val.match(/^\d+$/g) && val.length > 0) return
    dispacthFormEle({
      type: key,
      payload: Number(val),
    })
  }
  const caluclateLoan = (): void => {
    const { propertyValue, loanAmount, loanPeriod, interestRate } = formEle
    const monthlyInterest = interestRate / 12 / 100
    const totalPeriod = loanPeriod * 12
    const val = Math.round(
      (loanAmount * 10000) *
      (monthlyInterest *
        (Math.pow(1 + monthlyInterest, totalPeriod) /
          (Math.pow(1 + monthlyInterest, totalPeriod) - 1))))
    setResult({
      monthlyContribution: val,
      firstPayment: propertyValue - loanAmount,
      loanAmount: loanAmount,
      totalInterest: Math.round((val * totalPeriod - (loanAmount * 10000)) / 10000)
    })
  }
  useEffect(() => {
    const { propertyValue, loanAmount } = formEle
    if (propertyValue <= loanAmount) setHelperText('物業估值少於貸款額!!')
  }, [formEle])
  return (
    <Container style={{ position: 'relative' }}>
      <div className="cal-property">
        <form className="test-property-rate" autoComplete="off">
          <FormControl label={<span>物業估值(萬)</span>}>
            <input
              type="text"
              placeholder="物業估值(萬)"
              aria-label="物業估值"
              value={formEle.propertyValue}
              onChange={(evt) => hanldeOnChange('propertyValue', evt.target.value)}
            />
          </FormControl>
          <FormControl label={<span>貸款率(%)</span>}>
            <input
              type="text"
              min="1"
              max="95"
              placeholder="貸款率(%)"
              value={formEle.loanRate}
              onChange={(evt) => hanldeOnChange('loanRate', evt.target.value)}
            />
          </FormControl>
          <FormControl label={<span>貸款額(萬)</span>}>
            <input
              type="text"
              placeholder="貸款額(萬)"
              value={formEle.loanAmount}
              onChange={(evt) => hanldeOnChange('loanAmount', evt.target.value)}
            />
          </FormControl>
          <FormControl label={<span>還款期(年)</span>}>
            <input
              type="text"
              placeholder="還款期(年)"
              value={formEle.loanPeriod}
              onChange={(evt) => hanldeOnChange('loanPeriod', evt.target.value)}
            />
          </FormControl>
          <FormControl label={<span>利息(%)</span>}>
            <input
              type="text"
              placeholder="利息(%)"
              value={formEle.interestRate}
              onChange={(evt) => hanldeOnChange('interestRate', evt.target.value)}
            />
          </FormControl>
          <FormControl
            style={{
              gridRowStart: 4,
              gridColumnStart: 1,
              gridColumnEnd: 3,
              marginTop: 16,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Button
              style={{ width: '100%', background: '#2196F3' }}
              type="button"
              onClick={caluclateLoan}
            >
              計算
            </Button>
            <span style={{ color: '#E91E63' }}>{helperText}</span>
          </FormControl>
        </form>
        <div className="cal-result">
          <div className="chart"></div>
          <div className="result-tables">
            <span>總覽</span>
            <div className="table">
              <div>每月供款</div>
              <div>{result.monthlyContribution}</div>
              <div>首期</div>
              <div>{result.firstPayment}萬元</div>
              <div>貸款額</div>
              <div>{result.loanAmount}萬元</div>
              <div>總利息</div>
              <div>{result.totalInterest}萬元</div>
            </div>
            <span>其他開支</span>
            <div className="table">
              <div>印花稅</div>
              <div></div>
              <div>律師費</div>
              <div></div>
              <div>代理佣金</div>
              <div></div>
              <div>總開支</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      {/* <Calculator
        variant="expanded"
        calProps={{ style: { width: '100%', maxWidth: 360 } }}
        enableDrag={true}
      ></Calculator> */}
    </Container>
  )
}

export interface PropertyCalculationState {
  propertyValue: number
  loanRate: number
  loanAmount: number
  loanPeriod: number
  interestRate: number
}

export default Home
