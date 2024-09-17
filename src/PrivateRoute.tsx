// src/components/PrivateRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './@shared/contexts/AuthContext';

interface PrivateRouteProps {
    element: JSX.Element;
}

export function PrivateRoute({ element }: PrivateRouteProps) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Redireciona para a página de login e mantém o caminho original
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return element;
}
