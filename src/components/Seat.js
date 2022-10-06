import styled from "styled-components";
import colors from "../assets/css/colors";

function Seat({ name, status}) {
  const { GREEN, BORDERGREEN, GRAY, BORDERGRAY, YELLOW, BORDERYELLOW } = colors;

  function statusColor(status) {
    if (status === true) {
      return GRAY;
    } else {
      return YELLOW;
    }
  }

  function statusBorderColor(status) {
    if (status === true) {
      return BORDERGRAY;
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

  return name < 10 ? (
    <SeatLayout
      color={statusColor(status)}
      borderColor={statusBorderColor(status)}
      cursor={statusCursor(status)}
    >
      0{name}
    </SeatLayout>
  ) : (
    <SeatLayout
      color={statusColor(status)}
      borderColor={statusBorderColor(status)}
      cursor={statusCursor(status)}
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
