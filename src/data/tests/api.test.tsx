import { Api } from '../api'
// import mockAxios from 'axios';

jest.mock('axios');
// jest.unmock('axios');

describe('fetching players from every region/group', () => {
    it("fetches correctly NA/Div.A", async () => {
        const data = await Api.getPlayers('NA', 'A')
        expect(data.region).toBe('NA');
        expect(data.group).toBe('Division A')
    });
    it("fetches correctly NA/Div.B", async () => {
        const data = await Api.getPlayers('NA', 'B')
        expect(data.region).toBe('NA');
        expect(data.group).toBe('Division B')
    });
    it("fetches correctly EU/Div.A", async () => {
        const data = await Api.getPlayers('EU', 'A')
        expect(data.region).toBe('EU');
        expect(data.group).toBe('Division A')
    });
    it("fetches correctly EU/Div.B", async () => {
        const data = await Api.getPlayers('EU', 'B')
        expect(data.region).toBe('EU');
        expect(data.group).toBe('Division B')
    });
    it("fetches correctly APAC/Div.A", async () => {
        const data = await Api.getPlayers('APAC', 'A')
        expect(data.region).toBe('APAC');
        expect(data.group).toBe('Division A')
    });
    it("fetches correctly APAC/Div.B", async () => {
        const data = await Api.getPlayers('APAC', 'B')
        console.log(data);
        expect(data.region).toBe('APAC');
        expect(data.group).toBe('Division B')
    });
});

it('fetches results', async () => {
    // Region fetching is tested by previous test
    const data = await Api.getResults('APAC', 'A')
    console.log(data);
    expect(data.length).toBe(28);
    // expect(mockAxios.get).toHaveBeenCalledTimes(1);
    // expect(mockAxios.get).toHaveBeenCalledWith("http://xkcd.com/info.0.json");
});
