import { Navigate, Outlet } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { useAuth } from "./contexts/authProvider";
import { jwtDecode } from "jwt-decode";

function App() {

    const [authenticated, setAuthenticated] = useState({
        status: false,
        data: {} as any
    });

    const { token }:any = useAuth();

    useEffect(() => {
        if (token && !authenticated.status) {
            setAuthenticated({
                status: true,
                data: jwtDecode(token)
            });
        }
    }, [token, authenticated]);

    if (authenticated.status) {
        var wksp = authenticated.data.workspace.id
        return <Navigate to={`/${wksp}`} />;
    }

    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;