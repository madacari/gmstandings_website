import * as math from 'mathjs';
import React from 'react';

interface TableDisplayProps {
    players: string[];
    results: number[][];
}

class TableDisplay extends React.Component<TableDisplayProps> {
    render() {
        const { players, results } = this.props
        // computations
        const wins = results.map(pRes => {
            return addRow(pRes);
        })
        const tieBreaker = math.multiply(results, results).map(pTB => {
            return addRow(pTB);
        });
        const losses = math.transpose(results).map(pLos => {
            return addRow(pLos);
        });
        const played = wins.map((w,i) => {return w+losses[i]})
        return (
            <div>
                <p>{players.join(' ')}</p>
                <p>Played: {played.join(' ')}</p>
                <p>Wins: {wins.join(' | ')}</p>
                <p>TB: {tieBreaker.join(' | ')}</p>
            </div>
        );
    }
}

export default TableDisplay

// 

function addRow(row: number[]) {
    return row.reduce((a, b) => a + b)
}
