import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";

const App: React.FC = function () {
    const [authenticated] = useState(false);

    return (
        <>
            {authenticated && <MainLayout />}
            {!authenticated && <LoginLayout />}
        </>
    );
};

export default App;
