import { MainState } from "./types"

export const getCurrentRegion = (state: MainState) => {
    return state.regionToDisplay;
}

export const getCurrentGroup = (state: MainState) => {
    return state.groupToDisplay
}
