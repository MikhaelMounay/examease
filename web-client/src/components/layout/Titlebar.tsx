import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Titlebar: React.FC = function() {
    const { pathname } = useLocation();
    const [title, setTitle] = useState("Home");
    const [icon, setIcon] = useState<IconProp>(faHome);

    useEffect(() => {
        if (pathname.includes("/")) {
            setTitle("Home");
            setIcon(faHome);
        }
    }, [pathname]);

    return (
        <div>
            {pathname.includes("/") && (
                <div className="ms-4 flex items-center">
                    <FontAwesomeIcon icon={icon} />
                    <h1 className="ms-4 text-lg text-textColorLight mb-0 font-semibold">{title}</h1>
                </div>
            )}
        </div>
    );
};

export default Titlebar;
