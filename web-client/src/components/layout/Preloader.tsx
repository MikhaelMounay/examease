import { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import Logo from "../../assets/logo.png";

const Preloader: React.FC = function () {
    const [showConnectivityError, setShowConnectivityError] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowConnectivityError(true);
        }, 2000);
    }, []);

    return (
        <div className="z-50 flex h-full flex-col items-center justify-center">
            <div className="w-24">
                <img src={Logo} alt="ExamEase logo" className="shadow-2xl" />
            </div>

            <p className="my-10 text-3xl font-bold">ExamEase</p>

            <ProgressSpinner style={{ width: 65, height: 65 }} strokeWidth="4" aria-label="Loading" />

            {showConnectivityError && <p className="mt-6 text-sm text-red-600">Looks like we can't connect to server!</p>}
        </div>
    );
};

export default Preloader;
