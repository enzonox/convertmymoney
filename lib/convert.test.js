const  convert = require('./convert')

//Testando calculo da cotação
test('convert cotacao 4 and quantidade 4', () => {
    expect(convert.convert(4,4)).toBe(16)
})
test('convert cotacao 0 and quantidade 4', () => {
    expect(convert.convert(0,4)).toBe(0)
})

//Testando conversão para Float
test('ToMoney converts float', () => {
    expect(convert.toMoney(2)).toBe('2.00')
})
test('ToMoney converts String', () => {
    expect(convert.toMoney('2')).toBe('2.00')
})