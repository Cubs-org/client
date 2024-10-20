import { GoogleOAuthProvider } from '@react-oauth/google'

import { ModalProvider } from './modalContext'
import { CookiesProvider } from 'react-cookie'
import AuthProvider from './authProvider'
import { UserProvider } from './userContext'

export default ({ children }) => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string

    return (
        <CookiesProvider>
            <AuthProvider>
                <GoogleOAuthProvider clientId={clientId}>
                    <ModalProvider>
                        <UserProvider>{children}</UserProvider>
                    </ModalProvider>
                </GoogleOAuthProvider>
            </AuthProvider>
        </CookiesProvider>
    )
}
