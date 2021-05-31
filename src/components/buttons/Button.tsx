import styled from "styled-components";

const Button = styled.button`
  padding: 12px 8px;
  line-height: 1.75;
  border-radius: 5px;
  background: ${(props) => props.theme.palette.primary};
  color: ${(props) => props.theme.palette.contrastText};
  border: 1px solid transparent;
  cursor: pointer;
  transition: all .3s ease-in-out;
  &:hover {
    background: #363636;
  }
`;

export default Button;
