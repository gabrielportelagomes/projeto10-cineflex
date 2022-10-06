import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import loading from "../assets/img/loading.gif";

function ShowTimes() {
  const { idFilme } = useParams();
  const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`;
  const [movieInfo, setMovieInfo] = useState({});

  useEffect(() => {
    const promise = axios.get(URL);

    promise.then((response) => {
      setMovieInfo(response.data);
    });

    promise.catch((error) => console.log(error));
  }, []);

  if (movieInfo.days === undefined) {
    return (
      <Loading>
        <img src={loading} alt="loading gif" />
        <p>Carregando...</p>
      </Loading>
    );
  }

  return (
    <ShowTimesContainer>
      <MovieSessionContainer>
        <TopContainer>
          <h2>Selecione o horário</h2>
        </TopContainer>
        {movieInfo.days.map((m) => (
          <MovieSessionLayout key={m.id}>
            <div>
              <p>
                {m.weekday} - {m.date}
              </p>
            </div>
            <div>
              {m.showtimes.map((st) => (
                <Link to={`/assentos/${st.id}`} key={st.id}>
                  <button>{st.name}</button>
                </Link>
              ))}
            </div>
          </MovieSessionLayout>
        ))}
      </MovieSessionContainer>
      <Footer>
        <div>
          <img src={movieInfo.posterURL} alt={movieInfo.title} />
        </div>
        <p>{movieInfo.title}</p>
      </Footer>
    </ShowTimesContainer>
  );
}

export default ShowTimes;

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

const ShowTimesContainer = styled.div`
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

const MovieSessionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MovieSessionLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  margin-bottom: 23px;
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #293845;
  }
  button {
    width: 83px;
    height: 43px;
    margin: 22px 9px 23px 0;
    background-color: #e8833a;
    border-radius: 3px;
    border: none;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #ffffff;
    cursor: pointer;
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
  div {
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
  }
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 26px;
    color: #293845;
    margin-left: 14px;
  }
`;
