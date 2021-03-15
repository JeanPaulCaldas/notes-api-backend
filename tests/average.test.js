const { average } = require('../utils/for_testing')

describe.skip('average', () => {
  test('of one value is the value itself', () => {
    expect(average([2])).toBe(2)
  })

  test('of many values is correct', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})
