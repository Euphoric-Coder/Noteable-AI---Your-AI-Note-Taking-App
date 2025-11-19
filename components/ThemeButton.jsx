"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  // Detect current mode
  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setIsDark(currentTheme === "dark");
  }, [theme, systemTheme]);

  // Handle toggle
  const handleToggle = (checked) => {
    setIsDark(checked);
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={`h-4 w-4 transition-all ${
          isDark ? "text-gray-400 opacity-50" : "text-yellow-500 opacity-100"
        }`}
      />
      <Switch
        checked={isDark}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-red-400 transition-colors"
      />
      <Moon
        className={`h-4 w-4 transition-all ${
          isDark ? "text-blue-400 opacity-100" : "text-gray-400 opacity-50"
        }`}
      />
    </div>
  );
}
