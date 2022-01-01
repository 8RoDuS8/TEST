
const { pathsToModuleNameMapper } = require("ts-jest/utils")

const { compilerOptions } = require("./tsconfig.json");


/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: "coverage",
  verbose: true,
  testPathIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
};