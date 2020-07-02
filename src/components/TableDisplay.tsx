import * as math from 'mathjs';
import React from 'react';
import TableFormat from '../types';

interface TableDisplayProps {
    players: string[];
    results: number[][];
}

class TableDisplay extends React.Component<TableDisplayProps> {
    //Ref:  https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
    
    renderTableHeader(data: TableFormat[]) {
        let header = ['rank'].concat(Object.keys(data[0]));
        return header.map((key, index) => {
            let heading = index < header.length - 1 ? 
                key[0].toUpperCase() + key.slice(1): key.toUpperCase();
            return <th key={index}>{heading}</th>
        })
    }
    renderTableData(data: TableFormat[]) {
        return data.map((playerData, rank) => {
            const {player, played, wins, tb} = playerData;
            return (
                <tr key={rank}>
                    <td>{rank+1}</td>
                    <td>{player}</td>
                    <td>{played}</td>
                    <td>{wins}</td>
                    <td>{tb}</td>
                </tr>
            );
        });  
    }

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

        // reconstruction
        let table: TableFormat[] = []
        for (let i = 0; i < players.length; i++) {
            table.push({
                player: players[i],
                played: played[i],
                wins: wins[i],
                tb: tieBreaker[i]
            })
        }
        table.sort((a, b) => b.wins - a.wins || b.tb - a.tb);

        //  renders
        const renderTableData = this.renderTableData(table);
        const renderTableHeader = this.renderTableHeader(table);
        return (
            <div>
                <h3 id='title'>Grandmaster Standings</h3>
                <h6>(as they were before week 4)</h6>
                <table id='players'>
                    <tbody>
                        <tr>{renderTableHeader}</tr>
                        {renderTableData}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableDisplay

// 

function addRow(row: number[]) {
    return row.reduce((a, b) => a + b)
}

