import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

/**
 * Protege uma rota exigindo autenticação. Enquanto o estado de login
 * ainda está sendo verificado, mostra o Loader já usado nas transições
 * de página. Se não houver usuário autenticado, redireciona para /login,
 * guardando a rota de origem para retornar após o login.
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
