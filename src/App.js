import './App.css';
import {useContext, useState} from 'react'
import ThemeContext from './Context/ThemeContext'
import authorImg from './dsa.jpg'


function Square ({value1, onSquareClick}){
  return(    
    <button className='square' onClick={onSquareClick}>{value1}</button>
  );
}

function App() {
  
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const theme = useContext(ThemeContext);
  const [Theme, setTheme] = useState(theme);

  const themeHandler = ()=>{
    setTheme(Theme==='black'?'white':'black');
    console.log(Theme);
  }

  const onSquareClick = (i)=>{
    if(squares[i]|| winner(squares)){
      return;
    }
    const newArr = squares.slice();
    if(xIsNext){
      newArr[i] = 'X';
    }else{
      newArr[i] = 'O';
    }
    setSquares(newArr);
    setXIsNext(!xIsNext);
  };


const winner =(squares)=>{
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i=0;i<lines.length ; i++)
  {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
};


const win = winner(squares);
let status;
if(win){
  status = " Winner : " + win;
  // alert("Winner : "+ win);
//   status = `<dialog >
//   <p>Greetings, one and all!</p>
//   <form method="dialog">
//     <button>OK</button>
//   </form>
// </dialog>`
}else{
  status = "Next player : " + (xIsNext? "X":"O");
}
  return (
<ThemeContext.Provider value={theme}>
    <div className="App" id='app' style={{color:`${Theme}`}}>
      <button className='theme-btn' onClick={themeHandler}>ChangeTheme</button>
      <div className="img" id='author'>
      <img src={authorImg} alt="Author" />
       </div>
      <header className="App-header">
       <h1>Tic Tac Toe</h1>
       {status}
      </header>
      <div className="gameboard">
        <div className="square-row"> 
            <Square value1={squares[0]} onSquareClick={()=>onSquareClick(0)}/>
            <Square value1={squares[1]} onSquareClick={()=>onSquareClick(1)}/>
            <Square value1={squares[2]} onSquareClick={()=>onSquareClick(2)}/>
        </div>
        <div className="square-row">
            <Square value1={squares[3]} onSquareClick={()=>onSquareClick(3)}/>
            <Square value1={squares[4]} onSquareClick={()=>onSquareClick(4)}/>
            <Square value1={squares[5]} onSquareClick={()=>onSquareClick(5)}/>
        </div>
        <div className="square-row">
            <Square value1={squares[6]} onSquareClick={()=>onSquareClick(6)}/>
            <Square value1={squares[7]} onSquareClick={()=>onSquareClick(7)}/>
            <Square value1={squares[8]} onSquareClick={()=>onSquareClick(8)}/>
        </div>
      </div>
    </div>
    
</ThemeContext.Provider>
  );
}

export default App;
