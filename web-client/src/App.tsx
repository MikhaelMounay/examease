import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";
import CoursesView from "./pages/CoursesView";
import LoginPage from "./pages/LoginView";
import RegisterPage from "./pages/RegisterView";

const App: React.FC = function () {
    const [authenticated] = useState(true);

    return (
        <>
            {authenticated && <MainLayout/>}
            {!authenticated && <LoginLayout />}
        </>
    );
};

export default App;
