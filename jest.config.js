module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "jsx", "node"],
  moduleDirectories: ["node_modules", "src"],
};
