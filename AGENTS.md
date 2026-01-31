# Agent rules for Playwright project

## Structure
- Put smoke tests into tests/smoke
- Put regression tests into tests/regression
- Put shared logic into tests/fixtures
- Use playwright.config.ts baseURL
- Use seed test for storageState

## Testing rules
- Prefer getByRole / getByText over CSS selectors
- Never use nth-child
- No sleep(), use expect waits
- Tests must run in parallel
- Keep smoke tests fast

## Cookies
- Always call acceptCookiesIfPresent(page)

## Style
- TypeScript only
- One scenario per test
