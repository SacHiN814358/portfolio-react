/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [isLight, setIsLight] = useState(() => {
        try {
            return localStorage.getItem("portfolio-theme") === "light";
        } catch {
            return false;
        }
    });

    useEffect(() => {
        document.body.classList.toggle("light-theme", isLight);
        try {
            localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
        } catch {
            // localStorage not available in this environment
        }
    }, [isLight]);

    const toggleTheme = () => setIsLight(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isLight, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export default ThemeContext;
