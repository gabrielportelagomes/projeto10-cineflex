import styled from "styled-components";

function Logo() {
  return (
    <LogoContainer>
      <h1>CINEFLEX</h1>
    </LogoContainer>
  );
}

export default Logo;

const LogoContainer = styled.div`
  width: 100%;
  height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c3cfd9;
  h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 34px;
    color: #e8833a;
  }
`;
