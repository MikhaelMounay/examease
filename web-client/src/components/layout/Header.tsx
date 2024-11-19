import Titlebar from "./Titlebar.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header: React.FC = function() {
    const navigate = useNavigate();

    return (
        <header
            className="sticky hidden h-14 items-center justify-start bg-black bg-opacity-90 text-textColorLight shadow-md backdrop-blur-lg lg:flex"
        >
            <div className="mx-3 flex items-center">
                <button
                    onClick={() => navigate(-1)} className="px-3 duration-200 hover:-translate-x-0.5">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
            <Titlebar />
        </header>
    )
        ;
};

export default Header;
