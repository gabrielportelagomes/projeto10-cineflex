import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loading from "../assets/img/loading.gif";
import colors from "../assets/css/colors";
import Seat from "./Seat";

function Seats({
  form,
  setForm,
  selectedSeatId,
  setSelectedSeatId,
  seatsInfo,
  setSeatsInfo,
  selectedSeatName,
  setSelectedSeatName,
}) {
  const { GREEN, BORDERGREEN, GRAY, BORDERGRAY, YELLOW, BORDERYELLOW } = colors;
  const { idSessao } = useParams();
  const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`;
  const navigate = useNavigate();

  useEffect(() => {
    const promise = axios.get(URL);

    promise.then((response) => {
      setSeatsInfo(response.data);
    });

    promise.catch((error) => {
      console.log(error.response.data);
    });
  }, []);

  function handleForm(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function bookSeat(event) {
    if (selectedSeatId.length > 0) {
      event.preventDefault();
      const URL =
        "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";
      const body = { ...form, ids: selectedSeatId };
      setForm(body);
      const promise = axios.post(URL, body);

      promise.then((response) => {
        console.log(response.data);
      });

      promise.catch((error) => {
        console.log(error.reponse.data);
      });
      navigate("/sucesso");
    } else {
      alert("Selecione ao menos um assento!");
    }
  }

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
            id={s.id}
            name={s.name}
            status={s.isAvailable}
            setSelectedSeatId={setSelectedSeatId}
            selectedSeatId={selectedSeatId}
            selectedSeatName={selectedSeatName}
            setSelectedSeatName={setSelectedSeatName}
          />
        ))}
      </SeatContainer>
      <LabelsContainer>
        <SeatLabelContainer>
          <SeatLabel
            color={GREEN}
            borderColor={BORDERGREEN}
            data-identifier="seat-selected-subtitle"
          ></SeatLabel>
          <p>Selecionado</p>
        </SeatLabelContainer>
        <SeatLabelContainer>
          <SeatLabel
            color={GRAY}
            borderColor={BORDERGRAY}
            data-identifier="seat-available-subtitle"
          ></SeatLabel>
          <p>Disponível</p>
        </SeatLabelContainer>
        <SeatLabelContainer>
          <SeatLabel
            color={YELLOW}
            borderColor={BORDERYELLOW}
            data-identifier="seat-unavailable-subtitle"
          ></SeatLabel>
          <p>Indisponível</p>
        </SeatLabelContainer>
      </LabelsContainer>
      <FormContainer onSubmit={bookSeat}>
        <div>
          <Label htmlFor="name">Nome do comprador:</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleForm}
            type="text"
            placeholder="Digite seu nome..."
            required
            data-identifier="buyer-name-input"
          />
        </div>
        <div>
          <Label htmlFor="cpf">CPF do comprador:</Label>
          <Input
            id="cpf"
            name="cpf"
            value={form.cpf}
            onChange={handleForm}
            type="text"
            placeholder="Digite seu CPF..."
            minLength={11}
            maxLength={11}
            required
            data-identifier="buyer-cpf-input"
          />
        </div>
        <Button type="submit" data-identifier="reservation-btn">
          Reservar assento(s)
        </Button>
      </FormContainer>
      <Footer>
        <MoviePoster data-identifier="movie-img-preview">
          <img src={seatsInfo.movie.posterURL} alt={seatsInfo.movie.title} />
        </MoviePoster>
        <SessionInfosStyle data-identifier="movie-and-session-infos-preview">
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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 41px;
  div {
    display: flex;
    flex-direction: column;
  }
`;

const Label = styled.label`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 327px;
  height: 51px;
  border-radius: 3px;
  border: 1px solid #d5d5d5;
  background-color: #ffffff;
  margin-bottom: 10px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
  padding: 18px;
  ::placeholder {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 18px;
    font-style: italic;
    color: #afafaf;
  }
`;

const Button = styled.button`
  width: 225px;
  height: 42px;
  border-radius: 3px;
  border: none;
  background-color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #ffffff;
  margin-top: 50px;
  cursor: pointer;
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
