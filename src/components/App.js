import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../assets/GlobalStyle";
import Logo from "./Logo";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScreenContainer>
        <Logo />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ScreenContainer>
    </BrowserRouter>
  );
}

export default App;

const ScreenContainer = styled.div`
  width: 375px;
  height: 877px;
  margin: 0 auto;
  background-color: #ffffff;
`;
