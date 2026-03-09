import { type ReactElement, type ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@/context/ThemeContext';
import { ProgressProvider } from '@/context/ProgressContext';
import { AudioProvider } from '@/context/AudioContext';
import i18n from './i18n-test';

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <ProgressProvider>
            <AudioProvider>
              <BrowserRouter>{children}</BrowserRouter>
            </AudioProvider>
          </ProgressProvider>
        </ThemeProvider>
      </I18nextProvider>
    </HelmetProvider>
  );
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
