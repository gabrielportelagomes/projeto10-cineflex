import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

function ShowTimes() {
  const URL =
    "https://mock-api.driven.com.br/api/v5/cineflex/movies/1/showtimes"; /* modificar para url dinâmica */

  const [movieInfo, setMovieInfo] = useState([]);
  const [session, setSession] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    const promise = axios.get(URL);

   

    promise.then((response) => {
      setMovieInfo(response.data);
      setSession(response.data.days);
      const newTime = [
        ...time,
        response.data.days[0].showtimes[0].name,
        response.data.days[0].showtimes[1].name,
      ];
      setTime(newTime);
    });

    promise.catch((error) => console.log(error));
  }, []);

  return (
    <ShowTimesContainer>
      <TopContainer>
        <h2>Selecione o horário</h2>
      </TopContainer>
      <MovieSessionContainer>
        {session.map((s) => (
          <MovieSessionLayout key={s.id}>
            <div>
              <p>
                {s.weekday} - {s.date}
              </p>
            </div>
            <div>
              {s.showtimes.map((st) => <button key={st.id}>{st.name}</button>)}
            </div>
          </MovieSessionLayout>
        ))}
      </MovieSessionContainer>
    </ShowTimesContainer>
  );
}

export default ShowTimes;

const ShowTimesContainer = styled.div`
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

const MovieSessionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
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
