import Board from "./Board";
import "../../css/game.css";
import { useReducer } from "react";
import caculateWinner from "../../utils/helper";

// Commented code is the code using useState to make this game.
const Game = () => {
  const initialState = {
    board: Array(9).fill(null),
    xIsNext: true,
  };

  const gameReducer = (state, action) => {
    switch (action.type) {
      case "CLICK": {
        const nextState = JSON.parse(JSON.stringify(state));
        const { xIsNext } = state;
        const { index, winner } = action.payload;
        if (winner || nextState.board[index]) return nextState;
        nextState.board[index] = xIsNext ? "X" : "O";
        nextState.xIsNext = !xIsNext;
        return nextState;
      }
      case "RESET": {
        const nextState = JSON.parse(JSON.stringify(state));
        (nextState.board = Array(9).fill(null)), (nextState.xIsNext = true);
        return nextState;
      }
    }
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);
  // const [board, setBoard] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true);
  const winner = caculateWinner(state.board);

  const handleClick = (index) => {
    // const boardCopy = [...board];
    // if (winner || boardCopy[index]) return;
    // boardCopy[index] = xIsNext ? "X" : "O";
    // setBoard(boardCopy);
    // setXIsNext((xIsNext) => !xIsNext);
    dispatch({
      type: "CLICK",
      payload: {
        index,
        winner,
      },
    });
  };

  const handleResetGame = () => {
    dispatch({
      type: "RESET",
    });
  };

  console.log(handleClick);
  return (
    <div>
      <Board cells={state.board} onClick={handleClick}></Board>
      {winner ? `Winner is ${state.xIsNext ? "O" : "X"}` : ""}
      <button onClick={handleResetGame}>Reset game</button>
    </div>
  );
};

export default Game;
