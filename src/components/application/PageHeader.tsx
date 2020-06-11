import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: auto;
  margin: 0 auto;
  background-color: #fafded;
`;

const Logo = styled.img`
  width: 25%;
  margin: 10px 20px;
`;

// type Props = {
//   userName: string;
// };
export const PageHeader: React.FC = () => {
  return (
    <Container>
      <Logo src="/logo.png" alt="logo" />
    </Container>
  );
};
