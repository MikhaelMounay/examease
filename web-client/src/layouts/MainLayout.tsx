import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar.tsx";
import Sidebar from "../components/layout/Sidebar.tsx";
import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";

const MainLayout: React.FC = function () {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <div className="text-textColor bg-primaryBg relative">
                <div className="absolute inset-0 -z-10 bg-gray-100 bg-cover bg-no-repeat" />
                <Navbar setIsSidebarOpen={setIsSidebarOpen} />

                <div className="flex">
                    <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                    {/*// <!-- TODO: add overflow-hidden before release -->*/}
                    <main className="h-[calc(100vh-56px)] max-w-full flex-1 duration-300 lg:h-screen lg:max-w-[calc(100%-var(--sidebar-width)-0.5rem)]">
                        <div className="flex h-full flex-col">
                            <div className="flex-none">
                                <Header />
                            </div>
                            <div className="flex-auto">
                                <div className="flex max-h-[calc(100vh-56px)] min-h-[calc(100vh-56px)] flex-col overflow-auto">
                                    <article className="flex-auto p-4 text-lg lg:p-8">
                                        {/* TODO: Transition */}
                                        <Outlet />
                                    </article>
                                    <div className="flex-none">
                                        <Footer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div id="backdrop"></div>
        </>
    );
};

export default MainLayout;
