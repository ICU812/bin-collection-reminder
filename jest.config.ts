import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "./tsconfig.test.json",
      },
    ],
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  collectCoverageFrom: ["src/**/*.ts"],
};

export default config;
