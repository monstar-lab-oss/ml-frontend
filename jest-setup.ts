import "@testing-library/jest-dom";
// Need to use whatwg-fetch because mws can not intercept request
// when using node's built-in fetch
import 'whatwg-fetch'

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

// Mock env to prevent error: Cannot use 'import.meta' outside a module
// https://stackoverflow.com/questions/67777759/web-worker-jest-cannot-use-import-meta-outside-a-module
jest.mock('@/utils/env', () => {
  return {
    getApiHost() {
      return ''
    }
  }
})