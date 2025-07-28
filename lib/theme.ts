import componentsConfig from '../components.json';

export type Theme = 'dark' | 'light';

export interface LinearTheme {
  name: string;
  type: Theme;
  colors: {
    primary: {
      brand: string;
      accent: string;
      brandSubtle: string;
      brandHover: string;
      brandPressed: string;
    };
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      overlay: string;
      modal: string;
      panel: string;
      dialog: string;
      elevated: string;
      surface: string;
      surfaceElevated: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      muted: string;
      placeholder: string;
      inverse: string;
      link: string;
      linkHover: string;
      disabled: string;
    };
    border: {
      primary: string;
      secondary: string;
      subtle: string;
      muted: string;
      focus: string;
      error: string;
      success: string;
      warning: string;
    };
    surface: {
      elevated: string;
      pressed: string;
      hover: string;
      selected: string;
      disabled: string;
    };
    status: {
      error: string;
      errorSubtle: string;
      warning: string;
      warningSubtle: string;
      success: string;
      successSubtle: string;
      info: string;
      infoSubtle: string;
    };
    semantic: {
      linearPlan: string;
      linearBuild: string;
      linearSecurity: string;
      blue: string;
      green: string;
      orange: string;
      red: string;
      yellow: string;
      indigo: string;
    };
  };
  shadows: {
    none: string;
    small: string;
    medium: string;
    large: string;
    floating: string;
    glow: string;
  };
}

export const linearThemes = componentsConfig.themes as Record<Theme, LinearTheme>;
export const typography = componentsConfig.typography;
export const spacing = componentsConfig.spacing;
export const borderRadius = componentsConfig.borderRadius;
export const animation = componentsConfig.animation;
export const components = componentsConfig.components;

export function getTheme(theme: Theme): LinearTheme {
  return linearThemes[theme];
}

export function applyTheme(theme: Theme) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('linear-theme-preference', theme);
  }
}

export function getStoredTheme(): Theme {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('linear-theme-preference') as Theme;
    if (stored && (stored === 'dark' || stored === 'light')) {
      return stored;
    }
  }
  return 'dark'; // default to dark theme
}