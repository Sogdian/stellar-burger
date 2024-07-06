import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageProvider: "v8",
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {}
    ]
  }
};

export default config;
