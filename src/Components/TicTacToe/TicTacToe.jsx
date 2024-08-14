import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

const TicTacToe = () => {
  let [lock, setLock] = useState(false);
  let [isXTurn, setIsXTurn] = useState(true);
  let [board, setBoard] = useState(Array(9).fill(""));

  const titleRef = useRef(null);

  const toggle = index => {
    if (lock || board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "x" : "o";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    checkWin(newBoard);
  };

  const checkWin = newBoard => {
    const winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombination) {
      const [a, b, c] = combination;
      if (
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c] &&
        newBoard[c] !== ""
      ) {
        won(newBoard[a]);
        return;
      }
    }
    if (!newBoard.includes("")) {
      titleRef.current.innerHTML = "It's a Draw!";
      setLock(true);
    }
  };

  const won = winner => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: <img src=${
      winner === "x" ? cross_icon : circle_icon
    }> wins`;
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(Math.random() < 0.5);
    setLock(false);
    titleRef.current.innerHTML = `Tic Tac Toe In <span>React</span>`;
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe In <span>React</span>
      </h1>
      <div className="board">
        {board.map((box, index) => (
          <div key={index} className="boxes" onClick={() => toggle(index)}>
            {box && (
              <img src={box === "x" ? cross_icon : circle_icon} alt={box} />
            )}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
