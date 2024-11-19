import { NavLink } from "react-router-dom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SidebarProps = {
    linkTo: string;
    isSidebarCollapsed: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    icon: IconDefinition;
    label: string;
}

const SidebarItem: React.FC<SidebarProps> = function(props) {
    return (
        <li className="group relative mb-3">
            <NavLink
                to={props.linkTo}
                className={({ isActive }) => ("block h-full truncate rounded p-2 py-3 duration-200 hover:bg-primary hover:text-textColorLight " + (isActive ? "bg-secondary text-textColorLight" : ""))}
                // onClick={() => props.setIsSidebarOpen(false)} // TODO: either closes the navbar on click (good for small screens) or removes the whole sidebar on click (disastrous for large screens)
            >
                <div className={"flex items-center " + (props.isSidebarCollapsed ? "justify-center" : "")}>
                    <div className="mx-2">
                        <FontAwesomeIcon icon={props.icon} />
                    </div>
                    {!props.isSidebarCollapsed && (
                        <div className="truncate">
                            {props.label}
                        </div>
                    )}
                </div>
            </NavLink>
            {props.isSidebarCollapsed && (

                <div
                    v-show="isSidebarCollapsed"
                    className="invisible absolute left-full top-2 ml-8 -translate-x-3 truncate rounded-md bg-primary px-2 py-1 text-sm text-textColorLight opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100"
                >
                    {props.label}
                </div>
            )}
        </li>
    );
};

export default SidebarItem;
