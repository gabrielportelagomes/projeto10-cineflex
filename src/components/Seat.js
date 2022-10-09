import styled from "styled-components";
import colors from "../assets/css/colors";

function Seat({
  id,
  name,
  status,
  setSelectedSeatId,
  selectedSeatId,
  selectedSeatName,
  setSelectedSeatName,
}) {
  const { GREEN, BORDERGREEN, GRAY, BORDERGRAY, YELLOW, BORDERYELLOW } = colors;

  function statusColor(status, id) {
    if (status === true) {
      if (selectedSeatId.includes(id)) {
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
      if (selectedSeatId.includes(id)) {
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

  function selectSeat(id, name) {
    if (status === false) {
      alert("Esse assento não está disponível");
    } else {
      if (selectedSeatId.includes(id)) {
        const removeSelectedSeatId = selectedSeatId.filter((seat) => {
          return seat !== id;
        });
        setSelectedSeatId(removeSelectedSeatId);
        const removeSelectedSeatName = selectedSeatName.filter((seat) => {
          return seat !== name;
        });
        setSelectedSeatName(removeSelectedSeatName);
      } else {
        const newSelectedSeatId = [...selectedSeatId, id];
        setSelectedSeatId(newSelectedSeatId);
        const newSelectedSeatName = [...selectedSeatName, name];
        setSelectedSeatName(newSelectedSeatName);
      }
    }
  }

  return name < 10 ? (
    <SeatLayout
      color={statusColor(status, id)}
      borderColor={statusBorderColor(status, id)}
      cursor={statusCursor(status)}
      onClick={() => selectSeat(id, name)}
    >
      0{name}
    </SeatLayout>
  ) : (
    <SeatLayout
      color={statusColor(status, id)}
      borderColor={statusBorderColor(status)}
      cursor={statusCursor(status, id)}
      onClick={() => selectSeat(id, name)}
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
