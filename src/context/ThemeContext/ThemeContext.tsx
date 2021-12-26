import React, {useContext, useEffect, useMemo, useState} from 'react'
import {getSystemTheme, saveAppTheme} from './support/helper'
import {AppTheme} from '../../types'

type ThemeContextType = {
  theme: AppTheme
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: getSystemTheme(),
  toggleTheme: () => {}
})

export const ThemeContextProvider: React.FC = props => {
  console.log('1', getSystemTheme())
  const [theme, setTheme] = useState<AppTheme>(getSystemTheme())
  const [themeSwitch, setThemeSwitch] = useState(0)
  const toggleTheme = () => {
    const nextTheme = theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK
    setTheme(nextTheme)
    saveAppTheme(nextTheme)
    setThemeSwitch(count => count + 1)
  }

  console.log('THEME', theme)
  const isDark = theme === AppTheme.DARK
  const themeContext: ThemeContextType = useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme]
  )

  useEffect(() => {
    if (themeSwitch > 1) {
      // cleaner way is to clear css and load dynamically, but its demo
      window.location.reload()
    }
  }, [themeSwitch])

  useEffect(() => {
    if (isDark) {
      require('@elastic/eui/dist/eui_theme_dark.css')
    } else {
      require('@elastic/eui/dist/eui_theme_light.css')
    }
  }, [isDark])
  return <ThemeContext.Provider value={themeContext}>{props.children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
