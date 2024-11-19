import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faHome, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Titlebar: React.FC = function () {
    const { pathname } = useLocation();
    const [title, setTitle] = useState("Home");
    const [icon, setIcon] = useState<IconProp>(faHome);

    useEffect(() => {
        if (pathname.includes("courses")) {
            setTitle("Courses");
            setIcon(faBook);
        } else if (pathname.includes("create-course")) {
            setTitle("Create Course");
            setIcon(faFolderPlus);
        } else if (pathname.includes("/")) {
            setTitle("Home");
            setIcon(faHome);
        }
    }, [pathname]);

    return (
        <div>
            <div className="ms-4 flex items-center">
                <FontAwesomeIcon icon={icon} />
                <h1 className="text-textColorLight mb-0 ms-4 text-lg font-semibold">{title}</h1>
            </div>
        </div>
    );
};

export default Titlebar;
