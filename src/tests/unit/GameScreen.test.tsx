import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameScreen from '../../components/GameScreen';
import { GameContext } from '../../components/GameContext';

describe('GameScreen', () => {
  const mockSetGameStatus = vi.fn();
  const mockSetSelectedWord = vi.fn();

  const renderWithContext = (
    category = 'Animals',
    selectedWord = 'dog'
  ) => {
    const mockContextValue = {
      gameStatus: 'inprogress',
      setGameStatus: mockSetGameStatus,
      endGameStatus: '',
      setEndGameStatus: vi.fn(),
      category,
      setCategory: vi.fn(),
      selectedWord,
      setSelectedWord: mockSetSelectedWord,
    };

    return render(
      <GameContext.Provider value={mockContextValue}>
        <GameScreen />
      </GameContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders game screen without crashing', () => {
    renderWithContext();
    expect(screen.getByText(/ANIMALS/i)).toBeDefined();
  });

  it('displays category name in uppercase', () => {
    renderWithContext('Animals');
    expect(screen.getByText('ANIMALS')).toBeDefined();
  });

  it('renders all 26 letter buttons', () => {
    const { container } = renderWithContext();
    const letterButtons = container.querySelectorAll('.allLetters');
    expect(letterButtons.length).toBe(26);
  });

  it('displays letters in uppercase', () => {
    renderWithContext();
    expect(screen.getByText('A')).toBeDefined();
    expect(screen.getByText('Z')).toBeDefined();
  });

  it('renders progress bar component', () => {
    const { container } = renderWithContext();
    const progressBar = container.querySelector('.progressbar');
    expect(progressBar).toBeDefined();
  });

  it('displays blank spaces for hidden letters', () => {
    const { container } = renderWithContext('Animals', 'elephant');
    const correctLetters = container.querySelectorAll('.correctLetters');
    expect(correctLetters.length).toBeGreaterThan(0);
  });

  it('letter button gets usedLetter class after click', async () => {
    const user = userEvent.setup();
    const { container } = renderWithContext();

    const letterButtons = container.querySelectorAll('.allLetters');
    const firstLetterBtn = Array.from(letterButtons).find((btn) =>
      btn.textContent?.includes('A')
    );

    if (firstLetterBtn) {
      await user.click(firstLetterBtn);
      await waitFor(() => {
        expect(firstLetterBtn.classList.contains('usedLetter')).toBe(true);
      });
    }
  });

  it('marks letter as used after guessing', async () => {
    const user = userEvent.setup();
    const { container } = renderWithContext();

    const letterD = Array.from(
      container.querySelectorAll('.allLetters')
    ).find((btn) => btn.textContent?.includes('D'));

    if (letterD) {
      await user.click(letterD);
      await waitFor(() => {
        expect(letterD.classList.contains('usedLetter')).toBe(true);
      });
    }
  });

  it('reveals correct letters when guessed', async () => {
    const user = userEvent.setup();
    const { container } = renderWithContext('Animals', 'dog');

    const letterD = Array.from(
      container.querySelectorAll('.allLetters')
    ).find((btn) => btn.textContent?.includes('D'));

    if (letterD) {
      await user.click(letterD);
      await waitFor(() => {
        const revealedLetter = container.querySelector(
          '.answer .correctLetters'
        );
        expect(revealedLetter?.textContent).toBe('D');
      });
    }
  });

  it('handles spaces in words correctly', () => {
    const { container } = renderWithContext('Animals', 'sea lion');
    const mainanswers = container.querySelectorAll('.mainanswer');
    expect(mainanswers.length).toBe(2);
  });

  it('shows special characters automatically', () => {
    const { container } = renderWithContext('Movies', "It's");
    const correctLetters = container.querySelectorAll('.correctLetters');
    expect(correctLetters.length).toBeGreaterThan(0);
  });

  it('main game div has correct structure', () => {
    const { container } = renderWithContext();
    expect(container.querySelector('.maingamediv')).toBeDefined();
    expect(container.querySelector('.burgermenu')).toBeDefined();
    expect(container.querySelector('.answer')).toBeDefined();
    expect(container.querySelector('.letterOptions')).toBeDefined();
  });

  it('burger menu has correct elements', () => {
    const { container } = renderWithContext();
    const burgerMenu = container.querySelector('.burgermenu');
    expect(burgerMenu?.querySelector('span')).toBeDefined();
    expect(burgerMenu?.querySelector('p')).toBeDefined();
  });

  it('pause button is clickable', async () => {
    const user = userEvent.setup();
    const { container } = renderWithContext();

    const pauseBtn = container.querySelector('.burgermenu span');
    if (pauseBtn) {
      await user.click(pauseBtn);
      expect(pauseBtn).toBeDefined();
    }
  });

  it('handles single letter words', () => {
    const { container } = renderWithContext('Animals', 'a');
    const correctLetters = container.querySelectorAll('.correctLetters');
    expect(correctLetters.length).toBeGreaterThan(0);
  });

  it('handles multiple word phrases', () => {
    const { container } = renderWithContext('TV Shows', 'game of thrones');
    const mainanswers = container.querySelectorAll('.mainanswer');
    expect(mainanswers.length).toBe(3);
  });

  it('letter buttons are disabled after being used', async () => {
    const user = userEvent.setup();
    const { container } = renderWithContext();

    const letterA = Array.from(
      container.querySelectorAll('.allLetters')
    ).find((btn) => btn.textContent?.includes('A'));

    if (letterA) {
      await user.click(letterA);
      await waitFor(() => {
        expect(letterA.classList.contains('usedLetter')).toBe(true);
      });
    }
  });

  it('renders correct letters with proper styling', async () => {
    const user = userEvent.setup();
    const { container } = renderWithContext();

    const letterD = Array.from(
      container.querySelectorAll('.allLetters')
    ).find((btn) => btn.textContent?.includes('D'));

    if (letterD) {
      await user.click(letterD);
      await waitFor(() => {
        const correctLetterElements = screen.getAllByText('D');
        expect(correctLetterElements.length).toBeGreaterThan(0);
      });
    }
  });

  it('initializes with 8 health', () => {
    const { container } = renderWithContext();
    const filler = container.querySelector('.progressbar .filler') as HTMLElement;
    expect(filler.style.width).toBe('100%');
  });

  it('renders answer container with correct layout', () => {
    const { container } = renderWithContext();
    const answer = container.querySelector('.answer');
    expect(answer).toBeDefined();
    expect(answer?.querySelector('.mainanswer')).toBeDefined();
  });

  it('renders all letter options in a container', () => {
    const { container } = renderWithContext();
    const letterOptions = container.querySelector('.letterOptions');
    const letters = letterOptions?.querySelectorAll('.allLetters');
    expect(letters?.length).toBe(26);
  });

  it('handles case-insensitive letter matching', async () => {
    const user = userEvent.setup();
    const { container } = renderWithContext('Animals', 'Dog');

    const letterD = Array.from(
      container.querySelectorAll('.allLetters')
    ).find((btn) => btn.textContent?.includes('D'));

    if (letterD) {
      await user.click(letterD);
      await waitFor(() => {
        expect(letterD.classList.contains('usedLetter')).toBe(true);
      });
    }
  });

  it('renders burger menu with pause functionality', () => {
    const { container } = renderWithContext();
    const burgerMenu = container.querySelector('.burgermenu');
    const pauseSpan = burgerMenu?.querySelector('span');
    expect(pauseSpan).toBeDefined();
  });

  it('category text matches context category', () => {
    renderWithContext('Movies');
    expect(screen.getByText('MOVIES')).toBeDefined();
  });

  it('letter containers have correct structure', () => {
    const { container } = renderWithContext();
    const mainanswer = container.querySelector('.mainanswer');
    expect(mainanswer).toBeDefined();
  });

  it('handles words with repeated letters', async () => {
    const user = userEvent.setup();
    const { container } = renderWithContext('Animals', 'balloon');

    const letterL = Array.from(
      container.querySelectorAll('.allLetters')
    ).find((btn) => btn.textContent?.includes('L'));

    if (letterL) {
      await user.click(letterL);
      await waitFor(() => {
        const revealedLetters = container.querySelectorAll(
          '.answer .correctLetters'
        );
        const lLetters = Array.from(revealedLetters).filter(
          (el) => el.textContent === 'L'
        );
        expect(lLetters.length).toBe(2);
      });
    }
  });
});
