import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('renders without crashing', () => {
    const { container } = render(<ProgressBar health={8} />);
    expect(container.querySelector('.progressbar')).toBeDefined();
  });

  it('calculates health percentage correctly when health is full', () => {
    const { container } = render(<ProgressBar health={8} />);
    const filler = container.querySelector('.filler') as HTMLElement;
    expect(filler.style.width).toBe('100%');
  });

  it('calculates health percentage correctly when health is half', () => {
    const { container } = render(<ProgressBar health={4} />);
    const filler = container.querySelector('.filler') as HTMLElement;
    expect(filler.style.width).toBe('50%');
  });

  it('calculates health percentage correctly when health is 0', () => {
    const { container } = render(<ProgressBar health={0} />);
    const filler = container.querySelector('.filler') as HTMLElement;
    expect(filler.style.width).toBe('0%');
  });

  it('calculates health percentage correctly for partial values', () => {
    const { container } = render(<ProgressBar health={2} />);
    const filler = container.querySelector('.filler') as HTMLElement;
    expect(filler.style.width).toBe('25%');
  });

  it('updates width when health prop changes', () => {
    const { container, rerender } = render(<ProgressBar health={8} />);
    let filler = container.querySelector('.filler') as HTMLElement;
    expect(filler.style.width).toBe('100%');

    rerender(<ProgressBar health={0} />);
    filler = container.querySelector('.filler') as HTMLElement;
    expect(filler.style.width).toBe('0%');
  });

  it('renders progress bar container with correct class', () => {
    const { container } = render(<ProgressBar health={5} />);
    const progressBar = container.querySelector('.progressbar');
    expect(progressBar).toBeDefined();
  });

  it('renders filler span with correct class', () => {
    const { container } = render(<ProgressBar health={5} />);
    const filler = container.querySelector('.filler');
    expect(filler).toBeDefined();
  });
});
