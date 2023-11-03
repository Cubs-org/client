export const ThemeSwitcher = ({children}) => {
    // const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        // setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <button onClick={toggleTheme}>
            {children}
        </button>
    )
}