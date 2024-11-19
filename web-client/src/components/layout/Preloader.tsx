import { ProgressSpinner } from "primereact/progressspinner";
import Logo from "../../assets/logo.png";

const Preloader: React.FC = function () {
    return (
        <div className="z-50 flex h-full flex-col items-center justify-center">
            <div className="w-24">
                <img src={Logo} alt="ExamEase logo" className="shadow-2xl" />
            </div>

            <p className="my-10 text-2xl font-bold"></p>

            <ProgressSpinner style={{ width: 65, height: 65 }} strokeWidth="4" aria-label="Loading" />
        </div>
    );
};

export default Preloader;
