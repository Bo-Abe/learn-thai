import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/test-utils';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from '../LanguageSwitcher';

describe('LanguageSwitcher', () => {
  it('renders language options', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText(/EN/)).toBeInTheDocument();
    expect(screen.getByText(/FR/)).toBeInTheDocument();
  });

  it('switches language when clicked', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    const frButton = screen.getByText(/FR/);
    await user.click(frButton);
    // Language should have changed
    expect(document.documentElement.lang).toBe('fr');
  });

  it('renders compact version', () => {
    render(<LanguageSwitcher compact />);
    // In compact mode, shows only one button with the opposite language
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
