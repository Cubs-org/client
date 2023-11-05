import { GoogleOAuthProvider } from "@react-oauth/google"

import { ModalProvider } from "./modalContext"
import { ThemeProvider } from "./themeContext"

export default ({children}) => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string
    
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <ThemeProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </ThemeProvider>
        </GoogleOAuthProvider>
    )
}