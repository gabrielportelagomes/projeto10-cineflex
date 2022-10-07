import styled from "styled-components";
import colors from "../assets/css/colors";

function Seat({ id, name, status, setSelectedSeat, selectedSeat }) {
  const { GREEN, BORDERGREEN, GRAY, BORDERGRAY, YELLOW, BORDERYELLOW } = colors;

  function statusColor(status, id) {
    if (status === true) {
      if (selectedSeat.includes(id)) {
        return GREEN;
      } else {
        return GRAY;
      }
    } else {
      return YELLOW;
    }
  }

  function statusBorderColor(status, id) {
    if (status === true) {
      if (selectedSeat.includes(id)) {
        return BORDERGREEN;
      } else {
        return BORDERGRAY;
      }
    } else {
      return BORDERYELLOW;
    }
  }

  function statusCursor(status) {
    if (status === true) {
      return "pointer";
    } else {
      return "initial";
    }
  }

  function selectSeat(id) {
    if (status === false) {
      alert("Esse assento não está disponível");
    } else {
      if (selectedSeat.includes(id)) {
        const removeSelectedSeat = selectedSeat.filter((seat) => {
          return seat !== id;
        });
        setSelectedSeat(removeSelectedSeat);
      } else {
        const newSelectedSeat = [...selectedSeat, id];
        setSelectedSeat(newSelectedSeat);
      }
    }
  }

  return name < 10 ? (
    <SeatLayout
      color={statusColor(status, id)}
      borderColor={statusBorderColor(status, id)}
      cursor={statusCursor(status)}
      onClick={() => selectSeat(id)}
    >
      0{name}
    </SeatLayout>
  ) : (
    <SeatLayout
      color={statusColor(status, id)}
      borderColor={statusBorderColor(status)}
      cursor={statusCursor(status, id)}
      onClick={() => selectSeat(id)}
    >
      {name}
    </SeatLayout>
  );
}

export default Seat;

const SeatLayout = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid ${(props) => props.borderColor};
  cursor: ${(props) => props.cursor};
`;
