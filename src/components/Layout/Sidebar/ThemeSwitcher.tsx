import { useEffect } from "react"
import { useTheme } from "../../../contexts/themeContext"
import { FaMoon } from "react-icons/fa"
import { FaSun } from "react-icons/fa6"

export const ThemeSwitcher = ({ children, classNames }) => {
    // @ts-ignore
    const { theme, setTheme } = useTheme()

    let _theme

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
        localStorage.setItem("theme", theme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        _theme = localStorage.getItem("theme")

        const root = document.documentElement
        root.classList.remove(theme === "light" ? "dark" : "light")
        root.classList.add(theme)

        if (_theme) {
            setTheme(_theme)
        }
    }, [theme])

    return (
        <button onClick={toggleTheme} className={classNames}>
            <FaMoon data-theme={theme} className="text-lg block data-[theme=dark]:hidden" />
            <FaSun data-theme={theme} className="text-lg block data-[theme=light]:hidden" />
            {children}
        </button>
    )
}