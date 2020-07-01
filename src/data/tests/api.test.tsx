import { Api } from '../api'
import { RegionType, GroupType } from '../../types';
// import mockAxios from 'axios';

jest.mock('axios');
// jest.unmock('axios');

describe('fetching players from every region/group', () => {
    it("fetches correctly NA/Div.A", async () => {
        const data = await Api.getPlayers(RegionType.NA, GroupType.A)
        expect(data.region).toBe('NA');
        expect(data.group).toBe('Division A')
    });
    it("fetches correctly NA/Div.B", async () => {
        const data = await Api.getPlayers(RegionType.NA, GroupType.B)
        expect(data.region).toBe('NA');
        expect(data.group).toBe('Division B')
    });
    it("fetches correctly EU/Div.A", async () => {
        const data = await Api.getPlayers(RegionType.EU, GroupType.A)
        expect(data.region).toBe('EU');
        expect(data.group).toBe('Division A')
    });
    it("fetches correctly EU/Div.B", async () => {
        const data = await Api.getPlayers(RegionType.EU, GroupType.B)
        expect(data.region).toBe('EU');
        expect(data.group).toBe('Division B')
    });
    it("fetches correctly APAC/Div.A", async () => {
        const data = await Api.getPlayers(RegionType.APAC, GroupType.A)
        expect(data.region).toBe('APAC');
        expect(data.group).toBe('Division A')
    });
    it("fetches correctly APAC/Div.B", async () => {
        const data = await Api.getPlayers(RegionType.APAC, GroupType.B)
        console.log(data);
        expect(data.region).toBe('APAC');
        expect(data.group).toBe('Division B')
    });
});

it('fetches results', async () => {
    // Region fetching is tested by previous test
    const data = await Api.getResults(RegionType.APAC, GroupType.A)
    console.log(data);
    expect(data.length).toBe(28);
    // expect(mockAxios.get).toHaveBeenCalledTimes(1);
    // expect(mockAxios.get).toHaveBeenCalledWith("http://xkcd.com/info.0.json");
});
