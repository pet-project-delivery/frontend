import { createContext, ReactElement, useEffect, useState } from 'react';

export interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleThemeHandler: () => void;
}
const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleThemeHandler: () => {},
});

interface ThemeProps {
  children?: JSX.Element | Array<JSX.Element>;
}

export function ThemeProvider(props: ThemeProps): ReactElement {
  const [theme, setTheme] = useState('light');
  useEffect(() => initialThemeHandler());

  function isLocalStorageEmpty(): boolean {
    return !localStorage.getItem('theme');
  }

  function initialThemeHandler(): void {
    if (isLocalStorageEmpty()) {
      localStorage.setItem('theme', 'light');
      document!.querySelector('body')!.dataset.theme = 'light';
      setTheme('light');
    } else {
      const item = window.localStorage.getItem('theme');
      if (item !== null) {
        const colorTheme: string = item;
        if (colorTheme) {
          if (colorTheme === 'light') {
            document!.querySelector('body')!.dataset.theme = 'light';
            setTheme('light');
          } else {
            document!.querySelector('body')!.dataset.theme = 'dark';
            setTheme('dark');
          }
        }
      }
    }
  }

  function toggleThemeHandler(): void {
    const item = window.localStorage.getItem('theme');
    if (item !== null) {
      if (item === 'light') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
      toggleThemeDataToBody();
    }
  }

  function toggleThemeDataToBody(): void {
    if (theme === 'light') {
      document!.querySelector('body')!.dataset.theme = 'dark';
    } else {
      document!.querySelector('body')!.dataset.theme = 'light';
    }
  }

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleThemeHandler }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
