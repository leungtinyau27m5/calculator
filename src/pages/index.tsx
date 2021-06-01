import Calculator from "@/components/calculator/Calculator";
import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.palette.paper};
  width: 100%;
  height: 100%;
`;

const Home: FC = () => {
  return (
    <Container>
      <Calculator variant="expanded" calProps={{ style: { width: "100%" } }}></Calculator>
    </Container>
  );
}

export default Home