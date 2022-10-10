import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  const location = useLocation();

  function backTo() {
    navigate(-1);
  }

  return (
    <LogoContainer>
      <Button onClick={() => backTo()} location={location.pathname}>↩ Voltar</Button>
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
  position: relative;
  h1 {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 34px;
    color: #e8833a;
  }
`;

const Button = styled.button`
  position: absolute;
  left: 10px;
  width: 60px;
  height: 25px;
  border-radius: 3px;
  border: none;
  background-color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
  cursor: pointer;
  display: ${(props) => (props.location === "/" ? "none" : "initial")};
`;
