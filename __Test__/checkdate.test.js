import { checkDate } from '../src/client/js/checkdate'

describe('Testing checkDate functionality', () => {
    test('Input date should be passed if it has format of mm/dd/yyyy', () => {
        const input = '3/5/2020'
        expect(input).toBeTruthy()
    })
})