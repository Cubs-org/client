import { GoogleOAuthProvider } from "@react-oauth/google"

import { ModalProvider } from "./modalContext"
import { ThemeProvider } from "./themeContext"
import { CookiesProvider } from "react-cookie"
import AuthProvider from "./authProvider"
import { UserProvider } from "./userContext"
// import { SocketProvider } from "./socketContext"

export default ({ children }) => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string

    return (
        <CookiesProvider>
            <AuthProvider>
                <GoogleOAuthProvider clientId={clientId}>
                    <ThemeProvider>
                        <ModalProvider>
                            <UserProvider>
                                {children}
                            </UserProvider>
                        </ModalProvider>
                    </ThemeProvider>
                </GoogleOAuthProvider>
            </AuthProvider>
        </CookiesProvider>
    )
}