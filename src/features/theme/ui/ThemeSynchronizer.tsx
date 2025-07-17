"use client";

import { useEffect } from "react";

/**
 * Sets the theme-color meta tag to light theme only.
 * Ensures the browser UI (mobile address bar, etc.) matches the light theme.
 */
export function ThemeSynchronizer() {
  useEffect(() => {
    const themeColor = "#ffffff"; // Always use white for light theme
    let meta = document.querySelector("meta[name=theme-color]");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", themeColor);
  }, []);

  return null;
}
