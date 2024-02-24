import { 
    useState,
    createContext,
    useContext
} from "react"

const ThemeContext = createContext({})

const ThemeProvider = ({ children }) => {

    let prefer;
    if (window.matchMedia) {
        prefer = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
    } else {
        prefer = "light"
    }

    const [theme, setTheme] = useState(prefer);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

const useTheme = () => {
    const context = useContext(ThemeContext)
    return context
}

export { ThemeProvider, useTheme }