import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loading from "../assets/img/loading.gif";
import colors from "../assets/css/colors";
import Seat from "./Seat";

function Seats() {
  const { GREEN, BORDERGREEN, GRAY, BORDERGRAY, YELLOW, BORDERYELLOW } = colors;
  const { idSessao } = useParams();
  const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`;
  const [seatsInfo, setSeatsInfo] = useState({});

  useEffect(() => {
    const promise = axios.get(URL);

    promise.then((response) => {
      setSeatsInfo(response.data);
    });

    promise.catch((error) => console.log(error));
  }, []);

  if (seatsInfo.seats === undefined) {
    return (
      <Loading>
        <img src={loading} alt="loading gif" />
        <p>Carregando...</p>
      </Loading>
    );
  }

  return (
    <SeatsContainer>
      <TopContainer>
        <h2>Selecione o(s) horário(s)</h2>
      </TopContainer>
      <SeatContainer>
        {seatsInfo.seats.map((s) => (
          <Seat
            key={s.id}
            name={s.name}
            status={s.isAvailable}
          />
        ))}
      </SeatContainer>
      <LabelsContainer>
        <SeatLabelContainer>
          <SeatLabel color={GREEN} borderColor={BORDERGREEN}></SeatLabel>
          <p>Selecionado</p>
        </SeatLabelContainer>
        <SeatLabelContainer>
          <SeatLabel color={GRAY} borderColor={BORDERGRAY}></SeatLabel>
          <p>Disponível</p>
        </SeatLabelContainer>
        <SeatLabelContainer>
          <SeatLabel color={YELLOW} borderColor={BORDERYELLOW}></SeatLabel>
          <p>Indisponível</p>
        </SeatLabelContainer>
      </LabelsContainer>
      <Footer>
        <MoviePoster>
          <img src={seatsInfo.movie.posterURL} alt={seatsInfo.movie.title} />
        </MoviePoster>
        <SessionInfosStyle>
          <p>{seatsInfo.movie.title}</p>
          <p>
            {seatsInfo.day.weekday} - {seatsInfo.name}
          </p>
        </SessionInfosStyle>
      </Footer>
    </SeatsContainer>
  );
}

export default Seats;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
  }
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #293845;
  }
`;

const SeatsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
  margin-bottom: 40px;
  h2 {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 24px;
    color: #293845;
  }
`;

const SeatContainer = styled.div`
  display: grid;
  grid-template-columns: 26px 26px 26px 26px 26px 26px 26px 26px 26px 26px;
  grid-column-gap: 8px;
  grid-row-gap: 18px;
`;

const LabelsContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
`;

const SeatLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #293845;
  }
`;

const SeatLabel = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-bottom: 5px;
  background-color: ${(props) => props.color};
  border: 1px solid ${(props) => props.borderColor};
`;

const Footer = styled.div`
  width: 100%;
  height: 117px;
  background-color: #dfe6ed;
  border-top: 1px solid #9eadba;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
`;

const MoviePoster = styled.div`
  width: 64px;
  height: 89px;
  background-color: #ffffff;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 48px;
    height: 72px;
  }
`;

const SessionInfosStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 26px;
    color: #293845;
    margin-left: 14px;
    line-height: 1.1;
  }
`;
