// DOM REFERENCES
const themeToggle = document.getElementById('theme-toggle')

// THEME STORAGE HELPERS
const getTheme = () => { try { return localStorage.getItem('theme') } catch { return null } }
const setTheme = (themeValue) => { try { localStorage.setItem('theme', themeValue) } catch {} }

// THEME APPLIER
const applyTheme = (isDarkTheme) => {
    document.body.classList.toggle('dark-theme', isDarkTheme)
    themeToggle?.querySelector('.pokeball')?.classList.toggle('pokeball--ultra', isDarkTheme)
    setTheme(isDarkTheme ? 'enabled' : 'disabled')
}

// INITIAL THEME
const savedTheme = getTheme()
applyTheme(savedTheme ? savedTheme === 'enabled' : window.matchMedia?.('(prefers-color-scheme: dark)').matches)

// THEME TOGGLE HANDLER
themeToggle?.addEventListener('click', () => applyTheme(!document.body.classList.contains('dark-theme')))