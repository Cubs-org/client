import axios from "axios";
import { 
    createContext, useContext, useEffect, useMemo, useState
 } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState<string>();

    useEffect(() => {
        const _token = localStorage.getItem('token');
        if (_token) {
            setToken(_token);
        }
    }, []);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    const contextValue = useMemo(() => ({
        token, setToken 
    }), [token]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthProvider;