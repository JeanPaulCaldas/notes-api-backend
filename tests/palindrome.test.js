const { palindrome } = require('../utils/for_testing')

describe.skip('palindrome', () => {
  test('of jean', () => {
    const result = palindrome('jean')
    expect(result).toBe('naej')
  })

  test('of empty string', () => {
    const result = palindrome('')
    expect(result).toBe('')
  })

  test('of undefined', () => {
    const result = palindrome()
    expect(result).toBeUndefined()
  })
})
