import styled from "styled-components";
import { Link } from "react-router-dom";
import loading from "../assets/img/loading.gif";

function Sucess({
  form,
  setForm,
  setSelectedSeatId,
  seatsInfo,
  setSeatsInfo,
  selectedSeatName,
  setSelectedSeatName,
}) {
  function clearData() {
    setSelectedSeatId([]);
    setSelectedSeatName([]);
    setForm({ ids: "", name: "", cpf: "" });
    setSeatsInfo({});
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
    <SuccessContainer>
      <TopContainer>
        <h2>Pedido feito com sucesso!</h2>
      </TopContainer>
      <InfosContainer>
        <Infos>
          <h2>Filme e sessão</h2>
          <h3 data-identifier="movie-session-infos-reserve-finished">
            {seatsInfo.movie.title}
            <br />
            {seatsInfo.day.date} {seatsInfo.name}
          </h3>
        </Infos>
        <Infos>
          <h2>Ingressos</h2>
          {selectedSeatName.map((i) =>
            i < 10 ? (
              <h3 key={i} data-identifier="seat-infos-reserve-finished">
                Assento 0{i}
              </h3>
            ) : (
              <h3 key={i} data-identifier="seat-infos-reserve-finished">
                Assento {i}
              </h3>
            )
          )}
        </Infos>
        <Infos>
          <h2>Comprador</h2>
          <h3 data-identifier="buyer-infos-reserve-finished">
            Nome: {form.name}
            <br />
            CPF: {form.cpf.substr(0, 3)}.{form.cpf.substr(3, 3)}.
            {form.cpf.substr(6, 3)}-{form.cpf.substr(9, 2)}
          </h3>
        </Infos>
      </InfosContainer>
      <Link to={`/`}>
        <Button onClick={clearData} data-identifier="back-to-home-btn">Voltar para Home</Button>
      </Link>
    </SuccessContainer>
  );
}

export default Sucess;

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

const SuccessContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const TopContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
  margin-bottom: 40px;
  h2 {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: #247a6b;
    text-align: center;
  }
`;

const InfosContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Infos = styled.div`
  margin-left: 29px;
  margin-bottom: 40px;
  h2 {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: #293845;
    margin-bottom: 5px;
  }
  h3 {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 22px;
    color: #293845;
    line-height: 1.1;
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
