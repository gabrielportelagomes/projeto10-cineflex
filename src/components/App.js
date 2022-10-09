import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "../assets/css/GlobalStyle";
import Logo from "./Logo";
import Home from "./HomePage";
import ShowTimes from "./ShowTimesPage";
import Seats from "./SeatsPage";
import Sucess from "./SuccessPage";

function App() {
  const [selectedSeatId, setSelectedSeatId] = useState([]);
  const [selectedSeatName, setSelectedSeatName] = useState([]);
  const [form, setForm] = useState({ ids: "", name: "", cpf: "" });
  const [seatsInfo, setSeatsInfo] = useState({});

  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScreenContainer>
        <Logo />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sessoes/:idFilme" element={<ShowTimes />} />
          <Route
            path="/assentos/:idSessao"
            element={
              <Seats
                form={form}
                setForm={setForm}
                selectedSeatId={selectedSeatId}
                setSelectedSeatId={setSelectedSeatId}
                seatsInfo={seatsInfo}
                setSeatsInfo={setSeatsInfo}
                selectedSeatName={selectedSeatName}
                setSelectedSeatName={setSelectedSeatName}
              />
            }
          />
          <Route
            path="/sucesso"
            element={
              <Sucess
                form={form}
                setForm={setForm}
                setSelectedSeatId={setSelectedSeatId}
                seatsInfo={seatsInfo}
                setSeatsInfo={setSeatsInfo}
                selectedSeatName={selectedSeatName}
                setSelectedSeatName={setSelectedSeatName}
              />
            }
          />
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
