import { test, expect, devices } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should render correctly on mobile', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const playButton = page.locator('text=PLAY');
    await expect(playButton).toBeVisible();
  });

  test('should render correctly on tablet', async ({ page }) => {
    page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const playButton = page.locator('text=PLAY');
    await expect(playButton).toBeVisible();
  });

  test('should render correctly on desktop', async ({ page }) => {
    page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    const playButton = page.locator('text=PLAY');
    await expect(playButton).toBeVisible();
  });

  test('should display game properly on small mobile screen', async ({ page }) => {
    page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');

    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const categorySelection = page.locator('text=Pick a Category');
    await expect(categorySelection).toBeVisible();
  });

  test('should be playable on mobile viewport', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const animalCategory = page.locator('text=ANIMALS');
    await animalCategory.click();

    const letterButtons = page.locator('.allLetters');
    expect(await letterButtons.count()).toBe(26);
  });

  test('should allow letter selection on mobile', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const moviesCategory = page.locator('text=MOVIES');
    await moviesCategory.click();

    const letterA = page.locator('.allLetters').filter({ hasText: 'A' });
    await letterA.click();

    await expect(letterA).toHaveClass(/usedLetter/);
  });

  test('should display pause menu on mobile', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const categoriesCategory = page.locator('text=COUNTRIES');
    await categoriesCategory.click();

    const pauseButton = page.locator('.burgermenu span').first();
    await pauseButton.click();

    const pauseMenu = page.locator('text=Paused');
    await expect(pauseMenu).toBeVisible();
  });

  test('should maintain game flow across viewport changes', async ({ page }) => {
    await page.goto('/');

    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const capitalsCategory = page.locator('text=CAPITALS');
    await capitalsCategory.click();

    const gameScreen = page.locator('.maingamediv');
    await expect(gameScreen).toBeVisible();

    page.setViewportSize({ width: 375, height: 667 });
    await expect(gameScreen).toBeVisible();
  });

  test('should display instructions on mobile', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const instructionsButton = page.locator('text=HOW TO PLAY');
    await instructionsButton.click();

    const instructionsTitle = page.locator('text=How to Play');
    await expect(instructionsTitle).toBeVisible();
  });

  test('should display all sections on small screen', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const instructionsButton = page.locator('text=HOW TO PLAY');
    await instructionsButton.click();

    const instructionSections = page.locator('text=/CHOOSE A CATEGORY|GUESS LETTERS|WIN OR LOSE/');
    expect(await instructionSections.count()).toBe(3);
  });

  test('should handle back button on mobile', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const backButton = page.locator('.categorymain span').first();
    await backButton.click();

    const mainMenu = page.locator('text=PLAY');
    await expect(mainMenu).toBeVisible();
  });

  test('should be touch-friendly on mobile', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const playButton = page.locator('text=PLAY');
    const box = await playButton.boundingBox();

    expect(box?.width).toBeGreaterThan(50);
    expect(box?.height).toBeGreaterThan(50);
  });
});
