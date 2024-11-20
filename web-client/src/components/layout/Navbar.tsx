import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Titlebar from "./Titlebar.tsx";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = function (props) {
    const navigate = useNavigate();

    return (
        <nav className="text-textColorLight sticky flex h-14 items-center justify-start bg-black bg-opacity-90 shadow-md lg:hidden">
            <div className="mx-3 flex items-center">
                <button onClick={() => navigate(-1)} className="px-3 duration-200 hover:-translate-x-0.5">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <button onClick={() => props.setIsSidebarOpen(true)} className="px-3">
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            <Titlebar />
        </nav>
    );
};

export default Navbar;
