import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import { CourseProvider } from "./contexts/CourseContext.tsx";

import router from "./router";

import "./assets/styles/index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CourseProvider>
            <QueryClientProvider client={queryClient}>
                <PrimeReactProvider>
                    <RouterProvider router={router} />
                </PrimeReactProvider>
            </QueryClientProvider>
        </CourseProvider>
    </StrictMode>
);
