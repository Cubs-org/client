import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Cookies } from 'react-cookie';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    const _token = cookies.get('token');
    if (_token) {
      setToken(_token);
    }
    setTokenLoaded(true); // Marca que o token foi carregado
  }, []);

  const signIn = (newToken) => {
    cookies.set('token', newToken);
    setToken(newToken);
  };

  const signOut = () => {
    cookies.remove('token');
    setToken(null);
  };

  const contextValue = useMemo(() => ({
    token, 
    setToken, 
    signIn, 
    signOut
  }), [token]);

  if (!tokenLoaded) {
    // Aguarda o carregamento do token antes de renderizar qualquer coisa
    return null;
  }

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