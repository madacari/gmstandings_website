import { RegionType, GroupType } from "./types";

export const allPlayers = {
    APAC: {
        divA: ['glory', 'Surrender', 'Posesi', 'Ryvius', 'Alutemu'],
        divB: ['Staz', 'tom60229', 'blitzchung']
    },
    EU: {
        divA: ['Swidz', 'Bunnyhoppor', 'Jarla'],
        divB: ['Bozzzton', 'Zhym', 'Viper']
    },
    NA: {
        divA: ['Gallon', 'bloodyface', 'Nalguidan'],
        divB: ['PNC', 'Fr0zen', 'Purple']
    },
}

export function selectPlayers(regionToDisplay: RegionType, groupToDisplay: GroupType): string[] {
    // Choose region
    let playerReg;
    switch (regionToDisplay) {
        case RegionType.NA:
            playerReg = allPlayers.NA;
            break;
        case RegionType.EU:
            playerReg = allPlayers.EU;
            break;
        default:
            playerReg = allPlayers.APAC;
    }
    // Choose group
    let players;
    switch (groupToDisplay) {
        case GroupType.B:
            players = playerReg.divB;
            break;
        default:
            players = playerReg.divA;
    }
    return players;
}

export function selectMatches(players: string[]): string[][] {
    let matches = [];
    // make all combinations without repetition of players (i.e possible matches)
    // https://gist.github.com/axelpale/3118596
    for (let i = 0; i < players.length + 1; i++) {
        // head is a list that includes only our current element.
        var head = players.slice(i, i + 1);
        // We take smaller combinations from the subsequent elements
        var tailcombs = [];
        for (let j = i + 1; j < players.length; j++) {
            tailcombs.push([players[j]])
        }
        // we join it with the current
        // and store it to the set of k-combinations.
        for (let j = 0; j < tailcombs.length; j++) {
            matches.push(head.concat(tailcombs[j]));
        }
    }

    return matches;
}
