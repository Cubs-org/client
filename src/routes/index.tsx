import { createBrowserRouter } from "react-router-dom"
import { data } from "./Data";

export const router = createBrowserRouter([
    ...data.notAuthenticated,
    ...data.authenticated,
    ...data.admin
]);

  