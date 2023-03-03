import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../extensions/use-auth.extension";

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({ children }) => {
    const auth = useAuth();

    if (!auth.isAuthenticated()) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>;
}