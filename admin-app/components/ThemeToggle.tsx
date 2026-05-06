"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[5.625em] h-[2.5em] rounded-[6.25em] bg-gray-200 animate-pulse" style={{ fontSize: '11px' }} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <label className="theme-switch" title="Toggle Theme">
      <input
        type="checkbox"
        className="theme-switch__checkbox"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
      />
      <div className="theme-switch__container">
        <div className="theme-switch__circle-container">
          <div className="theme-switch__sun-moon-container">
            <div className="theme-switch__moon">
              <div className="theme-switch__spot"></div>
              <div className="theme-switch__spot"></div>
              <div className="theme-switch__spot"></div>
            </div>
          </div>
        </div>
        <div className="theme-switch__clouds"></div>
        <div className="theme-switch__stars-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 144 55"
            fill="currentColor"
          >
            <path
              d="m8 2 1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5zM21 7l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM14 13l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM2 20l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5zM24 22l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM11 28l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5zM2 37l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM19 38l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5zM10 45l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM24 48l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z"
            />
          </svg>
        </div>
      </div>
    </label>
  );
}
