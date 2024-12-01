import AuthWrapper from "./contexts/AuthWrapper";
import { useEffect, useState } from "react";

const App: React.FC = function () {
    const [isVirtualMachine, setIsVirtualMachine] = useState(false);

    // Anti-cheating Mechanisms checks if running the Electron App
    useEffect(() => {
        try {
            // Make sure the application is not running on a virtual machine
            // @ts-ignore
            window.electronAPI.on("isVirtualMachine", () => {
                setIsVirtualMachine(true);
            });
        } catch (err) {
            console.log("Error: ", err);
        }
    }, []);

    return (
        <div className="h-screen">
            {isVirtualMachine ? (
                <div className="flex h-full w-full items-center justify-center">
                    Sorry, this application shouldn't be used on a virtual machine.
                </div>
            ) : (
                <AuthWrapper />
            )}
        </div>
    );
};

export default App;
