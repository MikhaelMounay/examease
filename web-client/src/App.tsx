import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";
import CoursesView from "./pages/CoursesView";

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
