// https://hackernoon.com/api-testing-with-jest-d1ab74005c0a
import fs from 'fs';

const get = (url) => new Promise((resolve, reject) => {
    // Load user json data from a file in de subfolder for mock data
    fs.readFile(`./src/__mocks__/hsgmdata.json`, 'utf8', (err, data) => {
        if (err) reject(err)
        resolve({ data: JSON.parse(data) })
    })
})

export default { get }
