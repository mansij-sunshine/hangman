# Testing Guide

This project includes comprehensive unit tests with Vitest and end-to-end tests with Playwright.

## Unit Tests (Vitest)

### Overview
- **72 tests** covering all React components
- **97% statement coverage** (exceeds 80% target)
- **82.85% branch coverage**
- **93.93% function coverage**

### Test Files
- `src/components/ProgressBar.test.tsx` - Progress bar rendering and width calculations
- `src/components/PauseMenu.test.tsx` - Pause menu interactions and button clicks
- `src/components/PlayInstructions.test.tsx` - Instructions screen and content rendering
- `src/components/PickCategory.test.tsx` - Category selection and game initialization
- `src/components/GameScreen.test.tsx` - Core game mechanics and letter guessing

### Running Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test ProgressBar

# Run tests with UI dashboard
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Coverage Report
The coverage report is generated in `coverage/` directory with HTML report at `coverage/index.html`

### Test Structure
Each component test covers:
- Rendering without errors
- Props handling and updates
- User interactions (clicks, input)
- State changes and side effects
- Edge cases and special characters
- CSS class applications
- Component composition and structure

## End-to-End Tests (Playwright)

### Overview
Three test suites covering:
1. **Game Flow** - Navigation and screen transitions
2. **Game Mechanics** - Core gameplay interactions
3. **Responsive Design** - Mobile/tablet/desktop compatibility

### Test Files
- `src/tests/e2e/game-flow.spec.ts` - Menu navigation, category selection, game start
- `src/tests/e2e/game-mechanics.spec.ts` - Letter guessing, health system, pause menu
- `src/tests/e2e/responsive.spec.ts` - Mobile/tablet/desktop viewports

### Running E2E Tests

```bash
# Run all E2E tests (requires dev server running)
npm run e2e

# Run E2E tests with UI
npm run e2e:ui

# Run E2E tests in debug mode
npm run e2e:debug

# Run specific test file
npx playwright test game-flow.spec.ts

# Run tests against specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project="Mobile Chrome"
```

### Test Coverage Areas

**Game Flow Tests:**
- Load game with main menu
- Navigate to category selection
- Select category and start game
- Display all letter buttons
- Allow letter guessing
- Display progress bar
- Display category name
- Pause menu display

**Game Mechanics Tests:**
- Reveal correct letters when guessed
- Multiple sequential letter guesses
- Maintain game state during play
- Handle words with spaces
- Handle special characters
- Progress bar health system
- Pause/resume functionality
- Game navigation (new category, quit)

**Responsive Tests:**
- Mobile (375x667) - iPhone SE
- Tablet (768x1024) - iPad
- Desktop (1920x1080)
- Small mobile (320x568)
- Game playability across viewport sizes
- Touch-friendly button sizing

### Playwright Configuration

- **Test directory:** `src/tests/e2e/`
- **Base URL:** `http://localhost:5173`
- **Browsers tested:** Chromium, Firefox, WebKit, Mobile Chrome
- **Auto-launch dev server:** Yes (if not already running)
- **Retry logic:** 2 retries in CI, 0 locally
- **Screenshots:** Only on failure
- **Traces:** Recorded on first retry

## Running All Tests

```bash
# Run all unit tests with coverage
npm run test:coverage

# Run all E2E tests
npm run e2e

# Run both (sequentially)
npm run test:coverage && npm run e2e
```

## CI/CD Integration

Both test suites are designed for CI/CD pipelines:

**Unit Tests:**
- Fast execution (< 2 seconds)
- No external dependencies
- Deterministic results

**E2E Tests:**
- Requires running dev server
- ~30-60 seconds per test suite
- Configurable for headless mode
- Cross-browser testing

## Debugging

### Unit Tests
```bash
# Debug specific test
npm test -- ProgressBar --inspect-brk

# Watch mode for rapid feedback
npm test -- --watch
```

### E2E Tests
```bash
# Debug mode with Playwright Inspector
npm run e2e:debug

# Run with headed browser
npx playwright test --headed

# Run single test file
npx playwright test game-flow.spec.ts

# Trace viewing
npx playwright show-trace trace.zip
```

## Test Maintenance

### Adding New Unit Tests
1. Create `ComponentName.test.tsx` in `src/components/`
2. Import testing utilities: `describe`, `it`, `expect`, `render`, `screen`
3. Wrap tests with `describe` block
4. Test rendering, props, interactions, edge cases
5. Aim for > 80% coverage

### Adding New E2E Tests
1. Create `feature.spec.ts` in `src/tests/e2e/`
2. Use `test.describe` for test grouping
3. Test realistic user workflows
4. Include mobile viewport tests
5. Use selectors that match user-visible text when possible

## Performance Notes

- Unit tests run in parallel by default (faster)
- E2E tests can run in parallel (configured in playwright.config.ts)
- Coverage analysis adds ~200ms overhead
- First run may be slower due to dependency caching

## Common Issues

**"Cannot find module" errors:**
- Ensure all dependencies are installed: `npm install`

**E2E tests timeout:**
- Dev server may not be running
- Run `npm run dev` in another terminal
- Or let Playwright launch it automatically

**Port 5173 already in use:**
- Change port in `vite.config.ts`
- Or kill existing process: `lsof -i :5173`

**Coverage reports not generating:**
- Ensure `coverage/` directory is not in `.gitignore`
- Check write permissions in project directory
