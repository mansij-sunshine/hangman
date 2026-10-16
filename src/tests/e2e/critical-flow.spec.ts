import { test, expect } from '@playwright/test';

test.describe('Hangman Critical Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('1. should load main menu', async ({ page }) => {
    const playButton = page.locator('.playbutton');
    await expect(playButton).toBeVisible();
  });

  test('2. should navigate to category selection', async ({ page }) => {
    const playButton = page.locator('.playbutton');
    await playButton.click();

    const categoryTitle = page.locator('text=Pick a Category');
    await expect(categoryTitle).toBeVisible();
  });

  test('3. should start game from category selection', async ({ page }) => {
    const playButton = page.locator('.playbutton');
    await playButton.click();

    const categoryBtn = page.locator('.category', { hasText: 'ANIMALS' });
    await categoryBtn.click();

    const gameScreen = page.locator('.maingamediv');
    await expect(gameScreen).toBeVisible();
  });

  test('4. should display 26 letter buttons', async ({ page }) => {
    const playButton = page.locator('.playbutton');
    await playButton.click();

    const categoryBtn = page.locator('.category', { hasText: 'MOVIES' });
    await categoryBtn.click();

    const letterButtons = page.locator('.allLetters');
    await expect(letterButtons).toHaveCount(26);
  });

  test('5. should mark letter as used after click', async ({ page }) => {
    const playButton = page.locator('.playbutton');
    await playButton.click();

    const categoryBtn = page.locator('.category', { hasText: 'COUNTRIES' });
    await categoryBtn.click();

    const firstLetter = page.locator('.allLetters').first();
    await firstLetter.click();

    await expect(firstLetter).toHaveClass(/usedLetter/);
  });

  test('6. should display progress bar', async ({ page }) => {
    const playButton = page.locator('.playbutton');
    await playButton.click();

    const categoryBtn = page.locator('.category', { hasText: 'CAPITALS' });
    await categoryBtn.click();

    const progressBar = page.locator('.progressbar');
    await expect(progressBar).toBeVisible();
  });

  test('7. should show pause menu', async ({ page }) => {
    const playButton = page.locator('.playbutton');
    await playButton.click();

    const categoryBtn = page.locator('.category', { hasText: 'ANIMALS' });
    await categoryBtn.click();

    const pauseBtn = page.locator('.burgermenu button').first();
    await pauseBtn.click();

    const pauseMenu = page.locator('text=Paused');
    await expect(pauseMenu).toBeVisible();
  });

  test('8. should resume from pause menu', async ({ page }) => {
    const playButton = page.locator('.playbutton');
    await playButton.click();

    const categoryBtn = page.locator('.category', { hasText: 'SPORTS' });
    await categoryBtn.click();

    const pauseBtn = page.locator('.burgermenu button').first();
    await pauseBtn.click();

    const continueBtn = page.locator('text=CONTINUE');
    await continueBtn.click();

    const gameScreen = page.locator('.maingamediv');
    await expect(gameScreen).toBeVisible();
  });

  test('9. should display instructions screen', async ({ page }) => {
    const instructionsBtn = page.locator('.instructions');
    await instructionsBtn.click();

    const title = page.locator('text=How to Play');
    await expect(title).toBeVisible();
  });

  test('10. should return to menu from instructions', async ({ page }) => {
    const instructionsBtn = page.locator('.instructions');
    await instructionsBtn.click();

    const backBtn = page.locator('.categorymain button').first();
    await backBtn.click();

    const playBtn = page.locator('.playbutton');
    await expect(playBtn).toBeVisible();
  });
});
