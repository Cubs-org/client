import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Cookies } from 'react-cookie';

interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  signIn: (newToken: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    const _token = cookies.get('token');
    if (_token) {
      setToken(_token);
    }
    setTokenLoaded(true); // Marca que o token foi carregado
  }, []);

  const signIn = (newToken: string) => {
    cookies.set('token', newToken, {
      path: '/',
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7), // 7 dias
    });
    setToken(newToken);
  };

  const signOut = () => {
    cookies.remove('token', { path: '/' });
    setToken(null);
  };

  const contextValue = useMemo<AuthContextType>(() => ({
    token,
    setToken,
    signIn,
    signOut,
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
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
};

export default AuthProvider;