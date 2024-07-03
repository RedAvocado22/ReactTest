import Cell from "./Cell";
import PropTypes from "prop-types";

const Board = (props) => {
  return (
    <div>
      <div className="game-board">
        {props.cells.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onClick={() => props.onClick(index)}
            className={value == "X" ? "is-x" : value == "O" ? "is-o" : ""}
          ></Cell>
        ))}
      </div>
    </div>
  );
};

Board.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
};
export default Board;
