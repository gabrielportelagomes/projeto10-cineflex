import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loading from "../assets/img/loading.gif";

function Seats() {
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
        {seatsInfo.seats.map((s) =>
          s.name < 10 ? (
            <SeatLayout key={s.id}>0{s.name}</SeatLayout>
          ) : (
            <SeatLayout key={s.id}>{s.name}</SeatLayout>
          )
        )}
      </SeatContainer>
      <SeatLabelContainer>
        <SeatLabel>
          <div></div>
          <p>Selecionado</p>
        </SeatLabel>
        <SeatLabel>
          <div></div>
          <p>Disponível</p>
        </SeatLabel>
        <SeatLabel>
          <div></div>
          <p>Indisponível</p>
        </SeatLabel>
      </SeatLabelContainer>
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
  width: 100%;
  display: grid;
  grid-template-columns: 26px 26px 26px 26px 26px 26px 26px 26px 26px 26px;
  grid-column-gap: 7px;
  grid-row-gap: 18px;
  margin-left: 24px;
`;

const SeatLayout = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #808f9d;
  background-color: #c3cfd9;
  cursor: pointer;
`;

const SeatLabelContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
`;

const SeatLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-bottom: 5px;
    &:nth-child(1) {
      background-color: #1aae9e;
      border: 1px solid #0e7d71;
    }
    &:nth-child(2) {
      background-color: #c3cfd9;
      border: 1px solid #0e7d71;
    }
    &:nth-child(3) {
      background-color: #fbe192;
      border: 1px solid #f7c52b;
    }
  }
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #293845;
  }
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
