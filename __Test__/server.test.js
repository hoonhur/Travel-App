const app = require('../src/server/server')

const supertest = require('supertest')
const request = supertest(app)

describe('Testing Expresss Server POST ROUTE functionality', () => {
    test('APP should send projectData to user', async () => {
        const res = await request.get('/getData')
        expect(res.statusCode).toBe(200)
    })
})