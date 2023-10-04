import "./App.css";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "./Context/ThemeContext";
import authorImg from "./dsa.jpg";

const box = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

function Square({ value1, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value1}
    </button>
  );
}

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const theme = useContext(ThemeContext);
  const [Theme, setTheme] = useState(theme);
  const [status, setStatus] = useState("");

  const themeHandler = () => {
    setTheme(Theme === "black" ? "white" : "black");
    console.log(Theme);
  };

  const onSquareClick = (i) => {
    if (squares[i] || winner(squares)) {
      return;
    }
    const newArr = squares.slice();
    if (xIsNext) {
      newArr[i] = "X";
    } else {
      newArr[i] = "O";
    }
    setSquares(newArr);
    setXIsNext(!xIsNext);
  };

  const winner = (squares) => {
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
    
    for (const element of lines) {
      const [a, b, c] = element;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const win = winner(squares);

    if (win) {
      setStatus(" Winner : " + win);
    } else {
      setStatus("Next player : " + (xIsNext ? "X" : "O"));
    }
  }, [squares, xIsNext]);

  // alert("Winner : "+ win);
  //   status = `<dialog >
  //   <p>Greetings, one and all!</p>
  //   <form method="dialog">
  //     <button>OK</button>
  //   </form>
  // </dialog>`

  return (
    <ThemeContext.Provider value={theme}>
      <div className="App" id="app" style={{ color: `${Theme}` }}>
        <button className="theme-btn" onClick={themeHandler}>
          ChangeTheme
        </button>
        <div className="img" id="author">
          <img src={authorImg} alt="Author" />
        </div>
        <header className="App-header">
          <h1>Tic Tac Toe</h1>
          {status}
        </header>
        <div className="gameboard">
          {box.map((row, index) => {
            return (
              <div key={index} className="square-row">
                {row.map((value) => {
                  return (
                    <Square
                      key={value}
                      value1={squares[value]}
                      onSquareClick={() => onSquareClick(value)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
