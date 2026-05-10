"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@workspace/ui/components/button"
import { Moon, Sun, Palette } from "lucide-react"

const COLOR_THEMES = [
  { name: "Default", value: "" },
  { name: "Blue", value: "theme-blue" },
  { name: "Green", value: "theme-green" },
] as const

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [colorTheme, setColorTheme] = useState("")
  const [showPalette, setShowPalette] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("color-theme") ?? ""
    setColorTheme(saved)
    applyColorTheme(saved)
  }, [])

  function applyColorTheme(theme: string) {
    const html = document.documentElement
    COLOR_THEMES.forEach((t) => {
      if (t.value) html.classList.remove(t.value)
    })
    if (theme) html.classList.add(theme)
    localStorage.setItem("color-theme", theme)
    setColorTheme(theme)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowPalette(!showPalette)}
        >
          <Palette className="size-4" />
        </Button>
        {showPalette && (
          <div className="absolute right-0 top-full z-50 mt-2 rounded-lg border bg-popover p-2 shadow-md">
            {COLOR_THEMES.map((t) => (
              <button
                key={t.value}
                onClick={() => {
                  applyColorTheme(t.value)
                  setShowPalette(false)
                }}
                className={`block w-full rounded-md px-3 py-1.5 text-left text-sm hover:bg-accent ${
                  colorTheme === t.value ? "bg-accent font-medium" : ""
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      </Button>
    </div>
  )
}
