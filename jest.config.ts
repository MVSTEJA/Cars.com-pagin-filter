module.exports = {
  setupFilesAfterEnv: ["./rtl.setup.js", "./jest.setup.js"],
  moduleDirectories: [
      'node_modules',
      'utils',
      __dirname
  ]
};