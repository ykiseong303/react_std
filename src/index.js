import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
        
        // 생성자를 설정하는 것으로 state를 저장
        // square의 현재 값을 this.state에 저장
        // Square는 게임의 상태를 유지할 필요가 없기 때문에 생성자를 지움
        // constructor(props){
        //     // 클래스의 생성자를 정의할 때 항상 super를 호출 
        //     super(props);
        //     this.state = {
        //         value: null,
        //     };
            
        // }
        // board로부터 전달받은 prop을 화면에 내보냄
        // render함수는 화면에서 보고자 하는 내용을 반환함
        render() {
        return (
            <button className="square" 
            // 해당 컴포넌트 state의 변경 사항을 대기열에 넣고 
            // react에게 해당 컴포넌트와 갱신된 state를 사용하여 다시 렌더링 되어야한다고 전달
                onClick={() => this.props.onClick()}>
            {this.props.value}
            </button>
        );
        // board에서 renderSquare를 통해 각각의 Square 컴포넌트가 만들어졌고
        // 현재 게임의 state를 각각의 Square 컴포넌트에서 유지하고 있다 
        // Board가 각 Square에 state를 요청하는 것이 아닌
        // Board 컴포넌트에 게임의 상태를 저장하는 것이 가장 좋은 방법
        // 각 Square에게 prop을 전달하는 것으로 무엇을 표시할 지 알려준다
        }
}
  
class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }
    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
    }
    renderSquare(i) {
        // square에 value prop을 전달
      //return <Square value={i} />;
      //prop을 전달하는 방법을 다시 사용
      return (
          <Square 
            value={this.state.squares[i]}
            onClick={()=> this.handleClick(i)}
            />
      );
    }
    //화면출력
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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
  