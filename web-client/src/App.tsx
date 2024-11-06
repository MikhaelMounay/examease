import AuthWrapper from "./contexts/AuthWrapper";

const App: React.FC = function () {
    return (
        <>
            {/* {authenticated && <MainLayout/>}
            {!authenticated && <LoginLayout />} */}
            <AuthWrapper />
        </>
    );
};

export default App;
