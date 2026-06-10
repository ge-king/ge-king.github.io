import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext()
const validThemes = ['light', 'dark']

const getStoredTheme = () => {
  try {
    const theme = localStorage.getItem('themeName')
    return validThemes.includes(theme) ? theme : null
  } catch {
    return null
  }
}

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getInitialTheme = () => getStoredTheme() || getSystemTheme()

const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = themeName
  }, [themeName])

  useEffect(() => {
    if (getStoredTheme()) return undefined

    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const updateTheme = (e) => {
      setThemeName(e.matches ? 'dark' : 'light')
    }

    darkMediaQuery.addEventListener('change', updateTheme)
    return () => {
      darkMediaQuery.removeEventListener('change', updateTheme)
    }
  }, [])

  const toggleTheme = () => {
    const name = themeName === 'dark' ? 'light' : 'dark'
    localStorage.setItem('themeName', name)
    setThemeName(name)
  }


  return (
    <ThemeContext.Provider value={[{ themeName, toggleTheme }]}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ThemeProvider, ThemeContext }
