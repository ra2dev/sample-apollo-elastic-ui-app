import {AppTheme} from '../../../types'

const THEME_STORAGE_KEY = 'app-theme'

export const getSystemTheme = (): AppTheme => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)

  if (savedTheme) {
    return savedTheme === AppTheme.DARK ? AppTheme.DARK : AppTheme.LIGHT
  }
  return window?.matchMedia('(prefers-color-scheme: dark)')?.matches ? AppTheme.DARK : AppTheme.LIGHT
}

export const saveAppTheme = (theme: AppTheme) => {
  const item = document.getElementById('root')
  localStorage.setItem(THEME_STORAGE_KEY, theme)
  item?.classList?.remove(`${theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK}-theme`)
  item?.classList?.add(`${theme}-theme`)
}
