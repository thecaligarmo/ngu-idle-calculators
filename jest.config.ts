/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    // transform: {
    //     '^.+\\.tsx?$': 'ts-jest',
    //     // process `*.tsx` files with `ts-jest`
    // },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    // Coverage Collection
    collectCoverage: true,
    coveragePathIgnorePatterns : [
        "/node_modules/",
        "<rootDir>/src/__data__/",
        "<rootDir>/src/__tests__/",
    ],
}

