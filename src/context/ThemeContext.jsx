import React, { useEffect, useState } from 'react'
import { ThemeContext } from './themeContextInstance'

export const ThemeProvider = ({ children }) => {
    const [ isDarkMode, toggleDarkMode ] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') === "dark" : true
    );

    useEffect(() => {
        const root = window.document.documentElement;
        const body = window.document.body;
        if (isDarkMode) {
            root.classList.add("dark");
            root.classList.remove("light");
            body.classList.add("dark");
            body.classList.remove("light");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            root.classList.add("light");
            body.classList.remove("dark");
            body.classList.add("light");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const handleToggle = (mode) => {
        if (mode === "dark") toggleDarkMode(true);
        else if (mode === "light") toggleDarkMode(false);
        else toggleDarkMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode: handleToggle }}>
            {children}
        </ThemeContext.Provider>
    )
};