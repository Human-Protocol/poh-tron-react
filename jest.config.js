module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.(svg|png|gif|jpe?g)$': '<rootDir>/__mocks__/fileMock.js'
  }
};
