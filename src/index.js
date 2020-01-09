import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 1. 기존 Square 컴포넌트

// class Square extends React.Component {        
//         // }
//         // board로부터 전달받은 prop을 화면에 내보냄
//         // render함수는 화면에서 보고자 하는 내용을 반환함
//         render() {
//         return (
//             <button className="square" 
//             // 해당 컴포넌트 state의 변경 사항을 대기열에 넣고 
//             // react에게 해당 컴포넌트와 갱신된 state를 사용하여 다시 렌더링 되어야한다고 전달
//                 onClick={() => this.props.onClick()}>
//             {this.props.value}
//             </button>
//         );
//         }
// }

// 2. Square컴포넌트를 함수컴포넌트로 변경 
function Square(props) {
    // 클래스가 아니므로 this 키워드 삭제 
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
class Board extends React.Component {


    renderSquare(i) {
        // square에 value prop을 전달
      //return <Square value={i} />;
      //prop을 전달하는 방법을 다시 사용
      return (
          <Square 
            value={this.props.squares[i]}
            onClick={()=> this.props.onClick(i)}
            />
      );
    }
    //화면출력
    render() {
        return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
}
  
class Game extends React.Component {
    // Board의 데이터를 완벽히 제어,
    // history에 저장된 과거의 차례를 Board가 렌더링 할 수 있게함
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true
        };
    }
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = this.state.squares.slice();
        // 누군가 승리하거나 Square가 이미 채워졌다면 클릭을 무시하도록 지정
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // xIsNext가 true면 X, false면 O
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // react에게 렌더링 재실행해야함을 알림
        this.setState({
            // i번째 현재 squares의 값을 저장
            // 현재 xIsNext의 값을 반전해서 저장
            // squares: squares,
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
        })
        console.log(squares);
    }
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.winner);

        const moves = history.map((step, move) => {
            const desc = move ? 
            'Go to move #' + move : 
            'Go to game start';
            return (
                <li>
                    <button onClick={()=> this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if(winner) {
            status = 'Winner : ' + winner;
        } else {
            status = 'Next player : ' + (this.state.xIsNext ? 'X' : 'O');
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares = {current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
}
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  function calculateWinner(squares) {
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