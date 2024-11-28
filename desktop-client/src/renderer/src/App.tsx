import { useEffect } from "react";

const App: React.FC = function () {
    // const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

    useEffect(() => {
        (async () => {
            // @ts-ignore
            console.log(await window.api.getConfirmationFromDesktopApp());
        })();
    }, []);

    return (
        <div>
            <iframe src="http://localhost:5173/" className="h-screen w-screen"></iframe>
        </div>
    );
};

export default App;
