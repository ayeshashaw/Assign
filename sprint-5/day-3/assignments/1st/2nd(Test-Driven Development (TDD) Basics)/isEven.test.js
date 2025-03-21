// isEven.test.js
const isEven = require('./isEven');

test('should return true for even numbers', () => {
    expect(isEven(4)).toBe(true);
});

test('should return false for odd numbers', () => {
    expect(isEven(5)).toBe(false);
});
