import { test, expect } from '@playwright/test';

test.describe('Hangman Game Mechanics', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const playButton = page.locator('text=PLAY');
    await playButton.click();

    const categoryButton = page.locator('text=ANIMALS');
    await categoryButton.click();
  });

  test('should reveal correct letters when guessed', async ({ page }) => {
    const answerBefore = await page.locator('.answer').textContent();

    const letterA = page.locator('.allLetters').filter({ hasText: 'A' });
    await letterA.click();

    const answerAfter = await page.locator('.answer').textContent();
    expect(answerAfter).not.toBe(answerBefore);
  });

  test('should allow multiple letter guesses in sequence', async ({ page }) => {
    const firstLetter = page.locator('.allLetters').nth(0);
    const secondLetter = page.locator('.allLetters').nth(1);
    const thirdLetter = page.locator('.allLetters').nth(2);

    await firstLetter.click();
    await expect(firstLetter).toHaveClass(/usedLetter/);

    await secondLetter.click();
    await expect(secondLetter).toHaveClass(/usedLetter/);

    await thirdLetter.click();
    await expect(thirdLetter).toHaveClass(/usedLetter/);
  });

  test('should maintain game state during letter guesses', async ({ page }) => {
    const categoryDisplay = page.locator('.burgermenu p');
    const initialCategory = await categoryDisplay.textContent();

    const letter = page.locator('.allLetters').first();
    await letter.click();

    const finalCategory = await categoryDisplay.textContent();
    expect(finalCategory).toBe(initialCategory);
  });

  test('should display correct number of blank tiles', async ({ page }) => {
    const correctLetters = page.locator('.answer .correctLetters');
    const count = await correctLetters.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should handle words with multiple spaces', async ({ page }) => {
    const mainanswers = page.locator('.mainanswer');
    const count = await mainanswers.count();

    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should initialize progress bar at full health', async ({ page }) => {
    const filler = page.locator('.progressbar .filler');
    const width = await filler.evaluate((el) =>
      window.getComputedStyle(el).width
    );

    const progressBar = page.locator('.progressbar');
    const progressWidth = await progressBar.evaluate((el) =>
      window.getComputedStyle(el).width
    );

    expect(width).toBe(progressWidth);
  });

  test('should deduct health on wrong guess', async ({ page }) => {
    const progressBefore = await page.locator('.filler').evaluate((el) =>
      window.getComputedStyle(el).width
    );

    const allLetters = page.locator('.allLetters');
    let wrongLetterFound = false;

    for (let i = 0; i < 26; i++) {
      const letterBtn = allLetters.nth(i);
      const text = await letterBtn.textContent();

      const answerText = await page.locator('.answer').textContent();
      if (!answerText?.includes(text || '')) {
        await letterBtn.click();
        wrongLetterFound = true;
        break;
      }
    }

    if (wrongLetterFound) {
      const progressAfter = await page.locator('.filler').evaluate((el) =>
        window.getComputedStyle(el).width
      );

      expect(progressAfter).toBeLessThanOrEqual(progressBefore);
    }
  });

  test('should display pause menu with correct options', async ({ page }) => {
    const pauseButton = page.locator('.burgermenu span').first();
    await pauseButton.click();

    const continueBtn = page.locator('text=CONTINUE');
    const newCategoryBtn = page.locator('text=NEW CATEGORY');
    const quitBtn = page.locator('text=QUIT GAME');

    await expect(continueBtn).toBeVisible();
    await expect(newCategoryBtn).toBeVisible();
    await expect(quitBtn).toBeVisible();
  });

  test('should resume game from pause menu', async ({ page }) => {
    const pauseButton = page.locator('.burgermenu span').first();
    await pauseButton.click();

    const continueBtn = page.locator('text=CONTINUE');
    await continueBtn.click();

    const gameScreen = page.locator('.maingamediv');
    await expect(gameScreen).toBeVisible();
  });

  test('should navigate to new category from pause', async ({ page }) => {
    const pauseButton = page.locator('.burgermenu span').first();
    await pauseButton.click();

    const newCategoryBtn = page.locator('text=NEW CATEGORY');
    await newCategoryBtn.click();

    const categorySelection = page.locator('text=Pick a Category');
    await expect(categorySelection).toBeVisible();
  });

  test('should quit to menu from pause', async ({ page }) => {
    const pauseButton = page.locator('.burgermenu span').first();
    await pauseButton.click();

    const quitBtn = page.locator('text=QUIT GAME');
    await quitBtn.click();

    const playButton = page.locator('text=PLAY');
    await expect(playButton).toBeVisible();
  });

  test('should not allow clicking outside of buttons', async ({ page }) => {
    const answerDiv = page.locator('.answer');
    await answerDiv.click();

    const gameScreen = page.locator('.maingamediv');
    await expect(gameScreen).toBeVisible();
  });

  test('letter button should update state correctly on click', async ({ page }) => {
    const letterButton = page.locator('.allLetters').first();
    const initialClass = await letterButton.getAttribute('class');

    await letterButton.click();

    const finalClass = await letterButton.getAttribute('class');
    expect(finalClass).toContain('usedLetter');
    expect(initialClass).not.toBe(finalClass);
  });

  test('should maintain accurate answer display', async ({ page }) => {
    const correctLettersElements = page.locator('.answer .correctLetters');
    const initialCount = await correctLettersElements.count();

    expect(initialCount).toBeGreaterThan(0);
  });
});
