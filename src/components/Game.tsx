import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    xIsNext: true,
    stepNumber: 0,
  };

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  computerPlay() {
    const bestMove = this.calculateBestMove();
    console.log("Best Move: ", bestMove);
    this.handleClick(bestMove);
  }

  calculateBestMove(): number {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    let bestScore: number = -Infinity;
    let bestMove: number = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      // Check if available
      if (squares[i]) {
        continue;
      }
      // Play the move
      squares[i] = "O";
      let score = minimax(squares.slice(), 0, false);
      if (bestScore < score) {
        bestScore = score;
        bestMove = i;
      }
      console.log("New best move: ", bestMove)
      squares[i] = "";
    }
    return bestMove;
  }

  userPlay(i: number) {
    if (!this.state.xIsNext) {
      return;
    }
    this.handleClick(i);
    setTimeout(() => this.computerPlay(), 500);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li
          className="uppercase px-8 py-2 rounded border border-blue-600 text-blue-600 max-w-max shadow-sm hover:shadow-md"
          key={move}
        >
          <button
            className="focus:outline-none"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="flex flex-col items-center">
        <div className="p-10">
          <Board squares={current.squares} onClick={(i) => this.userPlay(i)} />
        </div>
        <div className="mt-1 text-center">
          <div
            className={`px-4 py-3 leading-normal text-blue-700 rounded-lg ${
              !winner
                ? "bg-blue-100"
                : winner === "X"
                ? "bg-red-100"
                : "bg-green-100"
            }`}
          >
            {status}
          </div>
          <ol className="mt-4 flex flex-col items-center space-y-1">{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: Array<string>): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function minimax(squares: Array<string>, depth: number, isMaximizingPlayer: boolean) {
  const aiScoreMap: any = {
    X: -1,
    O: 1,
    null: 0,
  };
  const winner: any = calculateWinner(squares);
  const isFull = squares.every(x => x)
  if (winner || isFull) {
    return aiScoreMap[winner];
  }

  if (isMaximizingPlayer) {
    let bestScore: number = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i]) {
        continue;
      }
      // Play the move
      squares[i] = "O";
      let score = minimax(squares, depth + 1, false);
      bestScore = Math.max(bestScore, score);
      squares[i] = "";
    }
    return bestScore
  } else {
    let bestScore: number = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i]) {
        continue;
      }
      // Play the move
      squares[i] = "X";
      let score = minimax(squares, depth + 1, true);
      bestScore = Math.min(bestScore, score);
      squares[i] = "";
    }
    return bestScore
  }
}
