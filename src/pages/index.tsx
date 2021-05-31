import Calculator from "@/components/calculator/Calculator";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.palette.paper};
  width: 100%;
  height: 100%;
`;

export default function Home() {
  return (
    <Container>
      <Calculator variant="expanded" calProps={{ style: { width: 370 } }}></Calculator>
    </Container>
  );
}
