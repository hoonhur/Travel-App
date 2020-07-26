const app = require('../src/server/server')

describe('Testing Expresss Server POST ROUTE functionality', () => {
    test('APP should send projectData to user', async () => {
        const res = await request(app)
        .post('/addData')
        .send(projectData)
    expect(res.statusCode).toEqual(200)
    })
})