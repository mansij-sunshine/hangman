import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PauseMenu from './PauseMenu';
import { GameContext } from './GameContext';

describe('PauseMenu', () => {
  const mockSetGameStatus = vi.fn();
  const mockOnClose = vi.fn();

  const renderWithContext = (status: string) => {
    const mockContextValue = {
      gameStatus: 'inprogress',
      setGameStatus: mockSetGameStatus,
      endGameStatus: '',
      setEndGameStatus: vi.fn(),
      category: 'Animals',
      setCategory: vi.fn(),
      selectedWord: 'dog',
      setSelectedWord: vi.fn(),
    };

    return render(
      <GameContext.Provider value={mockContextValue}>
        <PauseMenu status={status} onClose={mockOnClose} />
      </GameContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pause menu with status message', () => {
    renderWithContext('Paused');
    expect(screen.getByText('Paused')).toBeDefined();
  });

  it('renders CONTINUE button when status is Paused', () => {
    renderWithContext('Paused');
    expect(screen.getByText('CONTINUE')).toBeDefined();
  });

  it('renders PLAY AGAIN button when status is not Paused', () => {
    renderWithContext('You Win');
    expect(screen.getByText('PLAY AGAIN!')).toBeDefined();
  });

  it('renders NEW CATEGORY button', () => {
    renderWithContext('Paused');
    expect(screen.getByText('NEW CATEGORY')).toBeDefined();
  });

  it('renders QUIT GAME button', () => {
    renderWithContext('Paused');
    expect(screen.getByText('QUIT GAME')).toBeDefined();
  });

  it('calls setGameStatus and onClose when CONTINUE is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext('Paused');

    const continueBtn = screen.getByText('CONTINUE');
    await user.click(continueBtn);

    expect(mockSetGameStatus).toHaveBeenCalledWith('inprogress');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls setGameStatus and onClose when PLAY AGAIN is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext('You Win');

    const playAgainBtn = screen.getByText('PLAY AGAIN!');
    await user.click(playAgainBtn);

    expect(mockSetGameStatus).toHaveBeenCalledWith('play');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls setGameStatus and onClose when NEW CATEGORY is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext('Paused');

    const newCategoryBtn = screen.getByText('NEW CATEGORY');
    await user.click(newCategoryBtn);

    expect(mockSetGameStatus).toHaveBeenCalledWith('play');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls setGameStatus and onClose when QUIT GAME is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext('Paused');

    const quitBtn = screen.getByText('QUIT GAME');
    await user.click(quitBtn);

    expect(mockSetGameStatus).toHaveBeenCalledWith('menu');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('stops event propagation on click', async () => {
    const user = userEvent.setup();
    renderWithContext('Paused');

    const pauseMenu = screen.getByText('Paused').parentElement;
    const event = new MouseEvent('click', { bubbles: true });
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

    pauseMenu?.dispatchEvent(event);
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('displays You Win status correctly', () => {
    renderWithContext('You Win');
    expect(screen.getByText('You Win')).toBeDefined();
  });

  it('displays You Lose status correctly', () => {
    renderWithContext('You Lose');
    expect(screen.getByText('You Lose')).toBeDefined();
  });

  it('has correct CSS class', () => {
    const { container } = renderWithContext('Paused');
    const pauseMenu = container.querySelector('.mainpausemenu');
    expect(pauseMenu).toBeDefined();
  });
});
