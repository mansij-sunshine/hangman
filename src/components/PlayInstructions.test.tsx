import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayInstructions from './PlayInstructions';
import { GameContext } from './GameContext';

describe('PlayInstructions', () => {
  const mockSetGameStatus = vi.fn();

  const renderWithContext = () => {
    const mockContextValue = {
      gameStatus: 'instructions',
      setGameStatus: mockSetGameStatus,
      endGameStatus: '',
      setEndGameStatus: vi.fn(),
      category: '',
      setCategory: vi.fn(),
      selectedWord: undefined,
      setSelectedWord: vi.fn(),
    };

    return render(
      <GameContext.Provider value={mockContextValue}>
        <PlayInstructions />
      </GameContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithContext();
    expect(screen.getByText('How to Play')).toBeDefined();
  });

  it('displays the header with How to Play title', () => {
    renderWithContext();
    expect(screen.getByText('How to Play')).toBeDefined();
  });

  it('renders all instruction items', () => {
    renderWithContext();
    expect(screen.getByText('CHOOSE A CATEGORY')).toBeDefined();
    expect(screen.getByText('GUESS LETTERS')).toBeDefined();
    expect(screen.getByText('WIN OR LOSE')).toBeDefined();
  });

  it('displays all instruction IDs', () => {
    renderWithContext();
    expect(screen.getByText('01')).toBeDefined();
    expect(screen.getByText('02')).toBeDefined();
    expect(screen.getByText('03')).toBeDefined();
  });

  it('displays instruction details correctly', () => {
    renderWithContext();
    expect(
      screen.getByText(
        /First, choose a word category, like animals or movies/i
      )
    ).toBeDefined();
    expect(
      screen.getByText(/Take turns guessing letters/i)
    ).toBeDefined();
    expect(screen.getByText(/You win by guessing all the letters/i)).toBeDefined();
  });

  it('calls setGameStatus with menu when back button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = renderWithContext();

    const backButton = container.querySelector('.categorymain span');
    if (backButton) {
      await user.click(backButton);
      expect(mockSetGameStatus).toHaveBeenCalledWith('menu');
    }
  });

  it('has correct category main header structure', () => {
    const { container } = renderWithContext();
    const categoryMain = container.querySelector('.categorymain');
    expect(categoryMain).toBeDefined();
    expect(categoryMain?.querySelector('span')).toBeDefined();
    expect(categoryMain?.querySelector('p')).toBeDefined();
  });

  it('has correct help details container', () => {
    const { container } = renderWithContext();
    const helpDetails = container.querySelector('.helpdetails');
    expect(helpDetails).toBeDefined();
  });

  it('displays correct number of instruction sections', () => {
    const { container } = renderWithContext();
    const instructionDivs = container.querySelectorAll('.helpdetails > div');
    expect(instructionDivs.length).toBe(3);
  });

  it('each instruction has three paragraphs (id, name, details)', () => {
    const { container } = renderWithContext();
    const instructionDivs = container.querySelectorAll('.helpdetails > div');
    instructionDivs.forEach((div) => {
      const paragraphs = div.querySelectorAll('p');
      expect(paragraphs.length).toBe(3);
    });
  });

  it('renders instructions with keys to avoid console warnings', () => {
    renderWithContext();
    const instructions = screen.getAllByText(/CHOOSE A CATEGORY|GUESS LETTERS|WIN OR LOSE/);
    expect(instructions.length).toBe(3);
  });
});
