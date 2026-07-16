import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  signUp as signUpService,
  signIn as signInService,
  logout as logoutService,
  subscribeToAuthChanges,
} from "../services/authService";

const AuthContext = createContext(null);

/**
 * Provider que mantém o estado de autenticação (usuário logado ou não)
 * disponível para toda a aplicação, através do hook useAuth().
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = useCallback((name, email, password) => signUpService(name, email, password), []);
  const signIn = useCallback((email, password) => signInService(email, password), []);
  const logout = useCallback(() => logoutService(), []);

  const value = { user, loading, signUp, signIn, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Hook para acessar o usuário autenticado e as ações de login/cadastro/logout. */
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth precisa ser usado dentro de um <AuthProvider>.");
  }
  return context;
}

export default useAuth;
