import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
  it('renders with correct ARIA attributes', () => {
    render(<ProgressBar value={50} max={100} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '50');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('shows percentage when showPercentage is true', () => {
    render(<ProgressBar value={75} showPercentage />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('shows label when provided', () => {
    render(<ProgressBar value={30} label="Progress" />);
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  it('clamps percentage at 100', () => {
    render(<ProgressBar value={150} max={100} showPercentage />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
