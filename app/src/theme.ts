import { DefaultTheme } from 'styled-components';

const baseTheme = {
    fonts: {
        body: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        mono: 'var(--font-geist-mono), "SF Mono", "Roboto Mono", Menlo, Courier, monospace',
    },
    fontSizes: {
        small: '0.875rem',
        medium: '1rem',
        large: '1.25rem',
        xlarge: '1.5rem',
    },
    spacing: {
        small: '0.5rem',
        medium: '1rem',
        large: '1.5rem',
        xlarge: '2rem',
        topNavHeight: '30px',
        bottomNavHeight: '4rem',
    },
};

export const lightTheme: DefaultTheme = {
    ...baseTheme,
    colors: {
        background: 'var(--tg-theme-bg-color, #ffffff)',
        text: 'var(--tg-theme-text-color, #000000)',
        primary: 'var(--tg-theme-button-color, #3390ec)',
        secondary: 'var(--tg-theme-secondary-bg-color, #f0f0f0)',
        correct: '#6aaa64',
        present: '#c9b458',
        absent: '#787c7e',
        border: '#d3d6da',
    },
};

export const darkTheme: DefaultTheme = {
    ...baseTheme,
    colors: {
        background: 'var(--tg-theme-bg-color, #121213)',
        text: 'var(--tg-theme-text-color, #ffffff)',
        primary: 'var(--tg-theme-button-color, #538d4e)',
        secondary: 'var(--tg-theme-secondary-bg-color, #1a1a1b)',
        correct: '#538d4e',
        present: '#b59f3b',
        absent: '#3a3a3c',
        border: '#3a3a3c',
    },
};

export default darkTheme;
