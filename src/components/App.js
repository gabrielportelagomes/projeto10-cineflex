import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../assets/css/GlobalStyle";
import Logo from "./Logo";
import Home from "./HomePage";
import ShowTimes from "./ShowTimesPage";
import Seats from "./SeatsPage"

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScreenContainer>
        <Logo />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sessoes/:idFilme" element={<ShowTimes />} />
          <Route path="/assentos/:idSessao" element={<Seats/>} />
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
