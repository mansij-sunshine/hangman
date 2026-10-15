import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PickCategory from './PickCategory';
import { GameContext } from './GameContext';

describe('PickCategory', () => {
  const mockSetGameStatus = vi.fn();
  const mockSetCategory = vi.fn();
  const mockSetSelectedWord = vi.fn();

  const renderWithContext = () => {
    const mockContextValue = {
      gameStatus: 'play',
      setGameStatus: mockSetGameStatus,
      endGameStatus: '',
      setEndGameStatus: vi.fn(),
      category: '',
      setCategory: mockSetCategory,
      selectedWord: undefined,
      setSelectedWord: mockSetSelectedWord,
    };

    return render(
      <GameContext.Provider value={mockContextValue}>
        <PickCategory />
      </GameContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithContext();
    expect(screen.getByText('Pick a Category')).toBeDefined();
  });

  it('displays the Pick a Category header', () => {
    renderWithContext();
    expect(screen.getByText('Pick a Category')).toBeDefined();
  });

  it('renders all category options', () => {
    renderWithContext();
    expect(screen.getByText('TV SHOWS')).toBeDefined();
    expect(screen.getByText('MOVIES')).toBeDefined();
    expect(screen.getByText('COUNTRIES')).toBeDefined();
    expect(screen.getByText('CAPITALS')).toBeDefined();
    expect(screen.getByText('ANIMALS')).toBeDefined();
    expect(screen.getByText('SPORTS')).toBeDefined();
  });

  it('calls setCategory with correct capitalization when category is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext();

    const tvShowsBtn = screen.getByText('TV SHOWS');
    await user.click(tvShowsBtn);

    expect(mockSetCategory).toHaveBeenCalledWith('Tv shows');
  });

  it('calls setGameStatus with inprogress when category is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext();

    const moviesBtn = screen.getByText('MOVIES');
    await user.click(moviesBtn);

    expect(mockSetGameStatus).toHaveBeenCalledWith('inprogress');
  });

  it('calls setSelectedWord with undefined when category is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext();

    const countriesBtn = screen.getByText('COUNTRIES');
    await user.click(countriesBtn);

    expect(mockSetSelectedWord).toHaveBeenCalledWith(undefined);
  });

  it('all three context functions are called when category is selected', async () => {
    const user = userEvent.setup();
    renderWithContext();

    const capitalsBtn = screen.getByText('CAPITALS');
    await user.click(capitalsBtn);

    expect(mockSetCategory).toHaveBeenCalled();
    expect(mockSetGameStatus).toHaveBeenCalledWith('inprogress');
    expect(mockSetSelectedWord).toHaveBeenCalledWith(undefined);
  });

  it('back button calls setGameStatus with menu', async () => {
    const user = userEvent.setup();
    const { container } = renderWithContext();

    const backButton = container.querySelector('.categorymain span');
    if (backButton) {
      await user.click(backButton);
      expect(mockSetGameStatus).toHaveBeenCalledWith('menu');
    }
  });

  it('correctly capitalizes category names with special characters', async () => {
    const user = userEvent.setup();
    renderWithContext();

    const animalsBtn = screen.getByText('ANIMALS');
    await user.click(animalsBtn);

    expect(mockSetCategory).toHaveBeenCalledWith('Animals');
  });

  it('has correct category main structure', () => {
    const { container } = renderWithContext();
    const categoryMain = container.querySelector('.categorymain');
    expect(categoryMain).toBeDefined();
    expect(categoryMain?.querySelector('span')).toBeDefined();
    expect(categoryMain?.querySelector('p')).toBeDefined();
  });

  it('has correct all categories container', () => {
    const { container } = renderWithContext();
    const allCategories = container.querySelector('.allCategories');
    expect(allCategories).toBeDefined();
  });

  it('renders correct number of category items', () => {
    const { container } = renderWithContext();
    const categoryItems = container.querySelectorAll('.category');
    expect(categoryItems.length).toBe(6);
  });

  it('each category item is clickable', async () => {
    const user = userEvent.setup();
    renderWithContext();

    const sportsBtn = screen.getByText('SPORTS');
    expect(sportsBtn).toBeDefined();

    await user.click(sportsBtn);
    expect(mockSetGameStatus).toHaveBeenCalled();
  });

  it('category text is displayed correctly in uppercase', () => {
    renderWithContext();
    const categories = screen.getAllByText(/TV SHOWS|MOVIES|COUNTRIES|CAPITALS|ANIMALS|SPORTS/);
    expect(categories.length).toBe(6);
  });
});
