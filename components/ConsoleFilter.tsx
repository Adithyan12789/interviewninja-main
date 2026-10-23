"use client";

import { useEffect } from "react";

export default function ConsoleFilter() {
  useEffect(() => {
    // Store original console methods
    const originalError = console.error;
    const originalWarn = console.warn;

    // Override console.error to filter out specific messages
    console.error = (...args: unknown[]) => {
      const message = args[0]?.toString() || "";
      
      // Suppress daily-js deprecation warning
      if (message.includes("daily-js version") && message.includes("is no longer supported")) {
        return;
      }
      
      // Call original console.error for other messages
      originalError.apply(console, args);
    };

    // Override console.warn to filter out specific warnings
    console.warn = (...args: unknown[]) => {
      const message = args[0]?.toString() || "";
      
      // Suppress daily-js deprecation warning
      if (message.includes("daily-js version") && message.includes("is no longer supported")) {
        return;
      }
      
      // Call original console.warn for other messages
      originalWarn.apply(console, args);
    };

    // Cleanup: restore original console methods on unmount
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
