import React, { ReactNode, createContext, useMemo, useState } from 'react'
import { Theme } from '../constants'

interface ThemeProviderProps {
    children: ReactNode
}

export interface ThemeContent {
    theme: Theme
    setTheme: any
    isDarkTheme: boolean
}

export const ThemeContext = createContext<ThemeContent>({
    theme: Theme.LIGHT,
    setTheme: () => {},
    isDarkTheme: false
})

function ThemeProvider({children}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT)

    const isDarkTheme = theme === Theme.DARK ? true :false

    const contextValue = useMemo(() =>({
        theme, setTheme, isDarkTheme
    }), [theme, setTheme, isDarkTheme])

  return (
    <ThemeContext.Provider value={contextValue}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider