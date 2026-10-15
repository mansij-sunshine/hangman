import { test, expect } from '@playwright/test';

test.describe('Hangman Game Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the game with main menu', async ({ page }) => {
    await expect(page).toHaveTitle(/Hangman/i);
  });

  test('should navigate to category selection', async ({ page }) => {
    const playButton = page.locator('text=PLAY');
    await expect(playButton).toBeVisible();
    await playButton.click();

    const categoryTitle = page.locator('text=Pick a Category');
    await expect(categoryTitle).toBeVisible();
  });

  test('should select a category and start game', async ({ page }) => {
    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const animalCategory = page.locator('text=ANIMALS');
    await expect(animalCategory).toBeVisible();
    await animalCategory.click();

    const gameScreen = page.locator('.maingamediv');
    await expect(gameScreen).toBeVisible();
  });

  test('should display all letter buttons on game screen', async ({ page }) => {
    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const moviesCategory = page.locator('text=MOVIES');
    await moviesCategory.click();

    const letterButtons = page.locator('.allLetters');
    await expect(letterButtons).toHaveCount(26);
  });

  test('should allow guessing letters', async ({ page }) => {
    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const countriesCategory = page.locator('text=COUNTRIES');
    await countriesCategory.click();

    const firstLetter = page.locator('.allLetters').first();
    await firstLetter.click();

    await expect(firstLetter).toHaveClass(/usedLetter/);
  });

  test('should display progress bar on game screen', async ({ page }) => {
    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const capitalsCategory = page.locator('text=CAPITALS');
    await capitalsCategory.click();

    const progressBar = page.locator('.progressbar');
    await expect(progressBar).toBeVisible();
  });

  test('should display category name in game screen', async ({ page }) => {
    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const sportsCategory = page.locator('text=SPORTS');
    await sportsCategory.click();

    const categoryName = page.locator('.burgermenu p');
    await expect(categoryName).toContainText(/SPORTS|TV SHOWS|MOVIES|COUNTRIES|CAPITALS|ANIMALS/);
  });

  test('should mark guessed letter as used', async ({ page }) => {
    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const tvCategory = page.locator('text=TV SHOWS');
    await tvCategory.click();

    const allLetters = page.locator('.allLetters');
    const secondLetter = allLetters.nth(1);

    await secondLetter.click();
    await expect(secondLetter).toHaveClass(/usedLetter/);
  });

  test('should prevent clicking same letter twice', async ({ page }) => {
    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const animalsCategory = page.locator('text=ANIMALS');
    await animalsCategory.click();

    const firstLetter = page.locator('.allLetters').first();

    await firstLetter.click();
    await expect(firstLetter).toHaveClass(/usedLetter/);

    const letterBefore = await firstLetter.getAttribute('class');
    await firstLetter.click();
    const letterAfter = await firstLetter.getAttribute('class');

    expect(letterBefore).toBe(letterAfter);
  });

  test('should display answer blanks on game start', async ({ page }) => {
    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const moviesCategory = page.locator('text=MOVIES');
    await moviesCategory.click();

    const answerContainer = page.locator('.answer');
    await expect(answerContainer).toBeVisible();

    const correctLettersCount = page.locator('.correctLetters');
    expect(await correctLettersCount.count()).toBeGreaterThan(0);
  });

  test('should display pause menu when pause button is clicked', async ({ page }) => {
    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const categoriesCategory = page.locator('text=COUNTRIES');
    await categoriesCategory.click();

    const pauseButton = page.locator('.burgermenu span').first();
    await pauseButton.click();

    const pauseMenu = page.locator('text=Paused');
    await expect(pauseMenu).toBeVisible();
  });

  test('should show instructions screen', async ({ page }) => {
    const instructionsButton = page.locator('text=HOW TO PLAY');
    await expect(instructionsButton).toBeVisible();
    await instructionsButton.click();

    const instructionsTitle = page.locator('text=How to Play');
    await expect(instructionsTitle).toBeVisible();
  });

  test('should display all instruction sections', async ({ page }) => {
    const instructionsButton = page.locator('text=HOW TO PLAY');
    await instructionsButton.click();

    const instructionSections = page.locator('text=/CHOOSE A CATEGORY|GUESS LETTERS|WIN OR LOSE/');
    expect(await instructionSections.count()).toBe(3);
  });
});
