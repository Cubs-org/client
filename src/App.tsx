import { Outlet } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

function App() {
    return (
        <>
            <Nav />
            <div className="w-full h-[80vh]">
              <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default App;