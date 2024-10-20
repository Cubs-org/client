import { SocketProvider } from "@/contexts/socketContext";
import { RootLayout } from "./layout";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/contexts/themeContext";

export default function Layout() {
    return (
        <ThemeProvider>
            <SocketProvider>
                <RootLayout>
                    <Outlet />
                </RootLayout>
            </SocketProvider>
        </ThemeProvider>
    )
}
