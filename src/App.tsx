import { Navigate, Outlet } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { useAuth } from "./contexts/authProvider";
import { jwtDecode } from "jwt-decode";
import fetchWorkspace from "./api/fetchWorkspace";
import { TokenDecoded } from "./types/user";

function App() {

    const [authenticated, setAuthenticated] = useState({
        status: false,
        data: {} as any
    });

    const { token } = useAuth();

    async function fetchData() {
        const { user } = (jwtDecode(token as string) as TokenDecoded);
        const workspace = await fetchWorkspace(user.id);
    
        setAuthenticated({
            status: true,
            data: {
                user,
                workspace
            }
        });
    }
    
    useEffect(() => {
        if (token && !authenticated.status) {
            fetchData();
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