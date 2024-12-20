// jest.config.js
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom", // 브라우저 환경에서 테스트
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ], // 테스트 파일 패턴
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
    "^.+\\.tsx?$": "babel-jest",
    "^.+\\.scss$": "jest-css-modules-transform", // SCSS 파일 변환
  },
  rootDir: "./",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // 파일 경로 맞게 수정
};
