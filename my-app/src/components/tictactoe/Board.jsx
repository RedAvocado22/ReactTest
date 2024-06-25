import { calculateWinner } from "../../utils/helper";
import Cell from "./Cell";

const Board = () => {
  const cells = [null, null, null, "X", "X", "X", null, null, null];
  console.log(calculateWinner(cells));

  return (
    <div>
      <div className="game-board">
        {Array(9)
          .fill()
          .map((index) => (
            <Cell key={index}></Cell>
          ))}
      </div>
    </div>
  );
};

export default Board;
