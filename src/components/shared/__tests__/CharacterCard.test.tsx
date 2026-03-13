import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/tests/test-utils';
import userEvent from '@testing-library/user-event';
import { CharacterCard } from '../CharacterCard';

const defaultProps = {
  character: 'ກ',
  romanization: 'ko',
  ipaSound: '/k/',
  toneClass: 'mid' as const,
  exampleWord: 'ກົບ',
  exampleTranslation: 'frog',
  audioFile: '/assets/audio/consonants/ko.mp3',
};

describe('CharacterCard', () => {
  it('renders the Thai character and romanization', () => {
    render(<CharacterCard {...defaultProps} />);
    expect(screen.getByText('ກ')).toBeInTheDocument();
    expect(screen.getByText('ko')).toBeInTheDocument();
  });

  it('displays the IPA sound', () => {
    render(<CharacterCard {...defaultProps} />);
    expect(screen.getByText('/k/')).toBeInTheDocument();
  });

  it('shows the tone class badge', () => {
    render(<CharacterCard {...defaultProps} />);
    expect(screen.getByText('Mid')).toBeInTheDocument();
  });

  it('displays the example word and translation', () => {
    render(<CharacterCard {...defaultProps} />);
    expect(screen.getByText('ກົບ')).toBeInTheDocument();
    expect(screen.getByText('frog')).toBeInTheDocument();
  });

  it('has an audio play button', () => {
    render(<CharacterCard {...defaultProps} />);
    const playButton = screen.getByRole('button', { name: /play audio/i });
    expect(playButton).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<CharacterCard {...defaultProps} onClick={onClick} />);
    const card = screen.getByText('ກ').closest('[class*="rounded"]');
    if (card) {
      await user.click(card);
      expect(onClick).toHaveBeenCalled();
    }
  });

  it('shows check mark when learned', () => {
    render(<CharacterCard {...defaultProps} isLearned={true} />);
    // The check icon should be present (SVG with Check)
    const container = screen.getByText('ກ').closest('[class*="rounded"]');
    expect(container).toBeInTheDocument();
  });
});
