import { RegionSelection, SELECT_REGION, GroupSelection, SELECT_GROUP, SELECT_MATCH_WINNNER } from './types'
import { RegionType, GroupType } from '../types'

export function selectRegion(region: RegionType):  RegionSelection {
    return {
        type: SELECT_REGION,
        region: region
    }
}

export function selectGroup(group: GroupType): GroupSelection {
    return {
        type: SELECT_GROUP,
        group: group
    }
}

export function selectMatchWinner(matchIndex: number, winnerIndex: number) {
    return {
        type: SELECT_MATCH_WINNNER,
        matchIndex: matchIndex,
        winnerIndex: winnerIndex
    }
}

