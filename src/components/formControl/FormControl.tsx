import { FC, HTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

const StyledRow = styled.div`
  padding: 8px;
  width: 100%;
  color: ${(props) => props.theme.palette.contrastText};
  input {
    background-color: ${(props) => props.theme.palette.primary};
    color: inherit;
    padding: 8px;
    font-size: 1rem;
    border: none;
    min-width: 180px;
    width: 100%;
    height: 100%;
    border: none;
    &::placeholder {
      color: ${(props) => props.theme.palette.secondaryText};
    }
    @media (max-width: 768px) {
      min-width: auto;
    }
  }
`

const StyledAdornment = styled.div``

const FormControl: FC<FormControlProps> = ({
  startAdornment,
  endAdornment,
  children,
  label,
  ...rest
}) => {
  return (
    <StyledRow {...rest}>
      {label}
      {startAdornment && <StyledAdornment />}
      {children}
      {endAdornment && <StyledAdornment />}
    </StyledRow>
  )
}

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  startAdornment?: JSX.Element | ReactNode
  endAdornment?: JSX.Element | ReactNode
  label?: JSX.Element | ReactNode
}

export default FormControl
