const baseConfig = require('../../jest.config.base');

module.exports = Object.assign(baseConfig, {
  testMatch: ['**test.ts'],
  testPathIgnorePatterns: ['**.js'],
  testTimeout: 30000,
});
