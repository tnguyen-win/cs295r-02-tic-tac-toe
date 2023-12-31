import { useState } from 'react';
import './App.css';
import Status from './components/Status';
import Square from './components/Square';

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

const calculateWinner = squares => {
    for (const i in lines) {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return { winner: squares[a], winningLine: lines[i] };
    }

    return { winner: null, winningLine: [] };
};

function App() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState({ winner: null, winningLine: [] });

    const handleClick = event => {
        const i = parseInt(event.target.id);
        const localSquares = [...squares];

        localSquares[i] = xIsNext ? 'X' : 'O';

        const theWinner = calculateWinner(localSquares);

        setSquares(localSquares);
        setXIsNext(!xIsNext);
        setWinner(theWinner);
    };

    const renderSquare = i => {
        const className = squares[i] === null ? 'square' : (winner.winner !== null && winner.winner === squares[i]) && winner.winningLine.includes(i) ? 'square-winner' : 'square-full';
        const enabled = winner.winner === null && squares[i] === null;
        const eventHandler = enabled ? handleClick : () => { };
        const value = squares[i] !== null ? squares[i] : '';

        return <Square className={className} index={i} eventHandler={eventHandler} value={value} />;
    };

    const status = winner.winner ? `Winner: ${winner.winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
        <div>
            <Status status={status} />
            <div className='board-row'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

export default App;
