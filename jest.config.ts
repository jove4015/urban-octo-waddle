import { compilerOptions } from "./tsconfig.json";
import type { Config } from "@jest/types";
import { loadEnvConfig } from "@next/env";

function makeModuleNameMapperFromTsConfig(srcPath: string) {
  const { paths }: { paths: Record<string, string[]> } = compilerOptions;

  const aliases: { [key: string]: string } = {};

  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  Object.keys(paths).forEach((item) => {
    const key = item.replace("/*", "/(.*)");
    const path = paths[item]![0]!.replace("/*", "/$1");
    aliases[key] = srcPath + "/" + path;
  });
  return aliases;
}

const config: Config.InitialOptions = {
  clearMocks: true,
  verbose: true,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  roots: ["<rootDir>"],
  testMatch: [
    "**/tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  testPathIgnorePatterns: ["<rootDir>/.next", "<rootDir>/playwright/"],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/jest/__mocks__/fileMock.js",
    "\\.svg": "<rootDir>/test/jest/__mocks__/svg.js",
    "\\.(css|less)$": "<rootDir>/test/jest/__mocks__/styleMock.js",
    uuid: "uuid", // https://github.com/uuidjs/uuid/issues/451
    "#crypto": "@clerk/backend/dist/runtime/node/crypto.js",
    "#fetch": "@clerk/backend/dist/runtime/node/fetch.js",
    ...makeModuleNameMapperFromTsConfig("<rootDir>"),
  },
  setupFilesAfterEnv: [
  ],
};

export default config;
