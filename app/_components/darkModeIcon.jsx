"use client";
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeIcon = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}  
      className="relative w-12 h-7 rounded-full bg-gradient-to-r cursor-pointer from-white shadow-xl to-primary flex items-center transition-colors duration-300 focus:outline-none"
      aria-label="Toggle dark mode"
    >
      <span className={`absolute left-1 top-1 bg-white dark:bg-gray-800 w-5 h-5 rounded-full transform transition-transform duration-300 ${darkMode ? 'translate-x-5' : ''}`}>
        {darkMode ? (
          <Moon className="h-3 w-3 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        ) : (
          <Sun className="h-3 w-3 text-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
      </span>
    </button>
  );
};

export default DarkModeIcon;


