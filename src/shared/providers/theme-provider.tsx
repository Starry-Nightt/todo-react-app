import React, { ReactNode, createContext, useMemo, useState } from 'react'
import { Theme } from '../constants'

interface ThemeProviderProps {
    children: ReactNode
}

export interface ThemeContent {
    theme: Theme
    setTheme: any
}

export const ThemeContext = createContext<ThemeContent>({
    theme: Theme.LIGHT,
    setTheme: () => {}
})

function ThemeProvider({children}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT)

    const contextValue = useMemo(() =>({
        theme, setTheme
    }), [theme, setTheme])

  return (
    <ThemeContext.Provider value={contextValue}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider