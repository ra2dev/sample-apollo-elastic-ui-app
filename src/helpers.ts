const DARK_THEME = 'dark'

export const getIsDarkTheme = (): boolean => {
    return window.location?.hash?.includes(DARK_THEME)
}

export const toggleTheme = (): void => {
    window.location.hash = getIsDarkTheme() ? '' : `#${DARK_THEME}`
    window.location.reload()
}
