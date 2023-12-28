import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";

export const ProtectedRoute = () => {

    const { token }:any = useAuth();
    // const navigate = useNavigate();

    if (!token) {
        // navigate('/login');
        return <Navigate to={`/login`}/>
    }

    return <Outlet />
}