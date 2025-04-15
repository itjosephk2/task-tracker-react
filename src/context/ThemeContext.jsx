/**
 * ThemeContext
 *
 * Provides application-wide theme settings (dark or light mode) using React Context API.
 * Stores the theme preference in localStorage and updates the body class accordingly.
 */

import { createContext, useState, useEffect } from 'react';

/**
 * React Context to hold theme data (darkMode state and setter).
 * @type {React.Context<{darkMode: boolean, setDarkMode: Function}>}
 */
export const ThemeContext = createContext();

/**
 * ThemeProvider Component
 *
 * Wraps around components that need access to theme context.
 * Loads initial theme from localStorage and applies theme class to the body.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that consume the theme context
 * @returns {JSX.Element}
 */
export const ThemeProvider = ({ children }) => {
  /**
   * @type {[boolean, Function]} darkMode - Indicates if dark mode is enabled
   */
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  /**
   * Update the document body class and localStorage when theme changes
   */
  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-white' : 'bg-light text-dark';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
