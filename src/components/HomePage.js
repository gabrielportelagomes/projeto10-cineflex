import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [movies, setMovies] = useState([]);
  const URL = "https://mock-api.driven.com.br/api/v5/cineflex/movies";

  useEffect(() => {
    const promise = axios.get(URL);

    promise.then((response) => {
      setMovies(response.data);
    });

    promise.catch((error) => console.log(error));
  }, []);
  return (
    <HomeContainer>
      <TopContainer>
        <h2>Selecione o Filme</h2>
      </TopContainer>
      <MoviesContainer>
        {movies.map((m) => (
          <MovieLayout key={m.id}>
            <img src={m.posterURL} alt={m.title}/>
          </MovieLayout>
        ))}
      </MoviesContainer>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
  h2 {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 24px;
    color: #293845;
  }
`;

const MoviesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 35px;
  overflow-y: auto;
  cursor: pointer;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MovieLayout = styled.div`
  width: 145px;
  height: 209px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-bottom: 11px;
  img {
    width: 129px;
    height: 193px;
  }
`;
