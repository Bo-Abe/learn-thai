import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
}

type ThemeAction = { type: 'SET_THEME'; payload: Theme } | { type: 'TOGGLE_THEME' };

interface ThemeContextType extends ThemeState {
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    default:
      return state;
  }
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, { theme: getInitialTheme() });

  useEffect(() => {
    document.body.className = state.theme;
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' });
  const setTheme = (theme: Theme) => dispatch({ type: 'SET_THEME', payload: theme });

  return (
    <ThemeContext.Provider value={{ ...state, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
