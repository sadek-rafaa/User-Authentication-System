// DeepSeek
// module.exports = {
//   testEnvironment: 'node',
//   globalSetup: './tests/setup.js',  // Now points to correct filename
//   globalTeardown: './tests/teardown.js',
//   setupFilesAfterEnv: ['./tests/jest.setup.js'],
//   testTimeout: 15000
// };



// ChatGPT 
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'], // optional
  globalTeardown: '<rootDir>/tests/jest.teardown.js',
  detectOpenHandles: true,
  verbose: true
};


