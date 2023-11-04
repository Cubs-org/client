import { ModalProvider } from "./modalContext"
import { ThemeProvider } from "./themeContext"

export default ({children}) => {
    return (
        <ThemeProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </ThemeProvider>
    )
}