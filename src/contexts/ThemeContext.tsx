import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    const initial = (stored as Theme) || "dark";
    // Apply on first render so AnimatedThemeToggler starts in correct state
    window.document.documentElement.classList.remove("light", "dark");
    window.document.documentElement.classList.add(initial);
    return initial;
  });

  // Sync React state when AnimatedThemeToggler (or anything) changes the DOM class
  useEffect(() => {
    const sync = () => {
      const next: Theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
      setTheme((prev) => {
        if (prev !== next) localStorage.setItem("theme", next);
        return next;
      });
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(isDark ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
