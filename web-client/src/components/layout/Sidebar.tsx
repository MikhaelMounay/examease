import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faAngleLeft,
    faXmark,
    faCircleUser,
    faRightFromBracket,
    faHome,
    faBook,
    faBullhorn,
    faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthWrapper.tsx";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import SidebarItem from "./SidebarItem.tsx";
import { createPortal } from "react-dom";
import { Role } from "../../types/User.ts";

type SidebarProps = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = function (props) {
    // Constants
    const sidebarWidthConstraints = {
        minWidth: 192, // 12rem
        defaultWidth: 224, // 16rem
        maxWidth: 352, // 22rem
    };

    const breakpointsTailwind = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        xxl: 1536,
    };

    // User Data
    const { userData, logout } = useAuth();

    // React States
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(sidebarWidthConstraints.defaultWidth);
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarItems, _setSidebarItems] = useState<
        {
            linkTo: string;
            icon: IconDefinition;
            label: string;
            rolesEnabled: Role[];
        }[]
    >([
        {
            linkTo: "/",
            icon: faHome,
            label: "Home",
            rolesEnabled: ["STUDENT", "ADMIN", "INSTRUCTOR"],
        },
        {
            linkTo: "courses",
            icon: faBook,
            label: "Courses",
            rolesEnabled: ["STUDENT", "ADMIN", "INSTRUCTOR"],
        },
        {
            linkTo: "/create-course",
            icon: faFolderPlus,
            label: "Create Course",
            rolesEnabled: ["ADMIN", "INSTRUCTOR"],
        },
        {
            linkTo: " ",
            icon: faBullhorn,
            label: "Announcments",
            rolesEnabled: ["STUDENT", "ADMIN", "INSTRUCTOR"],
        },
    ]);

    // Methods
    // Event Listener for sidebar collapsing
    function handleResize() {
        if (window.innerWidth >= breakpointsTailwind.lg) {
            props.setIsSidebarOpen(true);
        } else {
            props.setIsSidebarOpen(false);
            setIsSidebarCollapsed(false);
        }
    }

    useEffect(() => {
        // Initial Sidebar Width
        document.documentElement.style.setProperty("--sidebar-width", `${sidebarWidthConstraints.defaultWidth}px`);
    }, [sidebarWidthConstraints.defaultWidth]);

    useEffect(() => {
        // Event Listeners for sidebar resizing
        window.addEventListener("mousemove", (e) => {
            if (!isResizing) {
                return;
            }

            const newWidth = sidebarWidth + e.movementX;
            if (newWidth >= sidebarWidthConstraints.minWidth && newWidth <= sidebarWidthConstraints.maxWidth) {
                setSidebarWidth(newWidth);
                document.documentElement.style.setProperty("--sidebar-width", `${newWidth}px`);
            }
        });

        window.addEventListener("mouseup", () => {
            setIsSidebarCollapsed(false);
        });

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", (_e) => {});
            window.removeEventListener("mouseup", () => {});
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isSidebarCollapsed) {
            document.documentElement.style.setProperty("--sidebar-width", `5rem`);
        } else {
            document.documentElement.style.setProperty("--sidebar-width", `${sidebarWidth}px`);
        }
    }, [isSidebarCollapsed]);

    return (
        <>
            {props.isSidebarOpen && (
                <div className="text-textColorLight absolute left-0 top-0 z-30 bg-black shadow-lg shadow-gray-600 lg:relative lg:flex lg:bg-opacity-85">
                    {props.isSidebarOpen &&
                        createPortal(
                            <div
                                className="absolute left-0 top-0 z-20 h-full w-full bg-gray-900 bg-opacity-50 lg:hidden"
                                onClick={() => props.setIsSidebarOpen(false)}
                            ></div>,
                            document.getElementById("backdrop")!
                        )}

                    <aside
                        className={"relative z-30 h-screen p-4 lg:pe-3 " + (isResizing ? "" : "duration-300")}
                        style={{
                            width:
                                window.innerWidth < breakpointsTailwind.lg
                                    ? "fit-content"
                                    : isSidebarCollapsed
                                      ? "5rem"
                                      : `${sidebarWidth / 16}rem`,
                        }}
                    >
                        <div className="flex h-full flex-col justify-between">
                            <div className="h-full overflow-hidden">
                                <div
                                    className={
                                        "mb-10 mt-3 flex items-center " +
                                        (isSidebarCollapsed ? "justify-center" : "justify-between")
                                    }
                                >
                                    {!isSidebarCollapsed && <p className="ms-2 truncate text-lg font-bold">ExamEase</p>}
                                    <button
                                        className="hidden h-8 w-8 rounded-full border-2 border-gray-400 lg:block"
                                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                    >
                                        {isSidebarCollapsed && <FontAwesomeIcon icon={faAngleRight} />}
                                        {!isSidebarCollapsed && <FontAwesomeIcon icon={faAngleLeft} />}
                                    </button>
                                    <button className="ms-2 p-2 lg:hidden" onClick={() => props.setIsSidebarOpen(false)}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </div>

                                <nav className="max-h-[calc(100%-120px)] overflow-y-auto overflow-x-hidden">
                                    <ul>
                                        {sidebarItems
                                            .filter((item) => item.rolesEnabled.includes(userData?.role || "STUDENT"))
                                            .map((item, i) => (
                                                <SidebarItem
                                                    key={i}
                                                    linkTo={item.linkTo}
                                                    isSidebarCollapsed={isSidebarCollapsed}
                                                    setIsSidebarOpen={props.setIsSidebarOpen}
                                                    icon={item.icon}
                                                    label={item.label}
                                                />
                                            ))}
                                    </ul>
                                </nav>
                            </div>
                            <div>
                                <ul>
                                    <li className={"relative mb-3 " + (isSidebarCollapsed ? "hidden" : "")}>
                                        <div className="block h-full w-full truncate rounded p-2 py-3">
                                            <div
                                                className={
                                                    "flex items-center " + (isSidebarCollapsed ? "justify-center" : "")
                                                }
                                            >
                                                <div className="mx-2">
                                                    <FontAwesomeIcon icon={faCircleUser} />
                                                </div>
                                                <div v-show="!isSidebarCollapsed" className="truncate">
                                                    {userData?.name}
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="group relative mb-3">
                                        <button
                                            className="hover:bg-primary hover:text-textColorLight block h-full w-full truncate rounded p-2 py-3 duration-200"
                                            onClick={() => {
                                                props.setIsSidebarOpen(false);
                                                logout();
                                            }}
                                        >
                                            <div
                                                className={
                                                    "flex items-center " + (isSidebarCollapsed ? "justify-center" : "")
                                                }
                                            >
                                                <div className="mx-2">
                                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                                </div>
                                                {!isSidebarCollapsed && <div className="truncate">Logout</div>}
                                            </div>
                                        </button>
                                        {isSidebarCollapsed && (
                                            <div className="bg-primary text-textColorLight invisible absolute left-full top-2 ml-8 -translate-x-3 truncate rounded-md px-2 py-1 text-sm opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
                                                Logout
                                            </div>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>
                    <div
                        className={"w-2 " + (!isSidebarCollapsed ? "cursor-col-resize" : "")}
                        onMouseDown={() => {
                            setIsResizing(false);
                        }}
                    ></div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
