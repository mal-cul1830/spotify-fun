import { assertLiteral } from '@babel/types';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function setSquareHoverColor({color}) {
    document.documentElement.style.setProperty('--squareHoverColor', color);
}

function Square(props) {
    return (
        <button 
            className='square'
            onClick = {props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xNext: true,
            wasNull: true,
        }
    }

    checkWinner() {
        const squares = this.state.squares.slice();
        const wins = [
            [0,1,2],
            [0,3,6],
            [0,4,8],
            [1,4,7],
            [2,5,8],
            [2,4,6],
            [3,4,5],
            [6,7,8],
        ];

        for(let i = 0; i < wins.length ; ++i) {
            let [x, y, z] = wins[i];
            x = squares[x];
            y = squares[y];
            z = squares[z];
            if( x &&
                x == y &&
                x == z )
                return x + " has won the game!";
            else if([x,y,z].indexOf(null) < -1)
                return "The game is a TIE!";
        }

        return null;
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if(squares[i])
            return;
        squares[i] = this.state.xNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xNext: !this.state.xNext,
        });
    }

    handleOnMouseOver(i) {
        const squares = this.state.squares.slice();
        if(!squares[i]){
            squares[i] = this.state.xNext ? 'X' : 'O';
            console.log(squares[i]);
            this.setState({
                squares: squares,
                wasNull: true,
            });
        } else {
            this.setState({
                wasNull: false,
            });
            return;
        }
        
    }

    handleOnMouseOut(i) {
        const squares = this.state.squares.slice();
        if(this.wasNull){
            squares[i] = null;
            this.setState({
                squares: squares,
                xNext: !this.state.xNext,
            });
        } else
            return;
        
    }

    renderSquare(i) {
        return <Square 
                    value={this.state.squares[i]}
                    onClick = {() => this.handleClick(i)}
                />
    };

    restartGame() {
        let squares = this.state.squares.slice();
        squares.fill(null);
        this.setState({
            squares: squares
        })
    }

    render() {
        if(this.state.xNext)
            setSquareHoverColor({color: "#90EE90"});
        else
            setSquareHoverColor({color: "#FFC0CB"});
        let winner = this.checkWinner();
        let status;
        if(winner) {
            status = winner;
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
                <button 
                class="restart-game"
                onClick={() => {
                    this.restartGame();
                    }}>
                    Restart Game?
                </button>
            </div>
            );
        }
        else{
            console.log("Normal");
            status = "Current player = " + (this.state.xNext? 'X' : 'O');
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
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div></div>
                    <ol></ol>
                </div>
            </div>
        );
    }
}

const root = 
ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(<Game/>);