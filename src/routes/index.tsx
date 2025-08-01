import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { data } from "./Data";
import { useAuth } from "../contexts/authProvider";
import Test from "../pages/Test";

export const AppRoutes = () => {

    const { token } = useAuth();

    let routes;
    if (token) {
        routes = data.authenticated;
    } else {
        routes = data.notAuthenticated;
    }

    const router = createBrowserRouter([
        ...routes,
        // test-route
        {
            path: "/test",
            element: <Test />
        }
    ]);

    return <RouterProvider router={router} />
}

  