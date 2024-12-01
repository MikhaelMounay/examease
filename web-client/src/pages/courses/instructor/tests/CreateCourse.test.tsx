import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateCourse from "../NewCourseView.tsx";
import { useAuth } from "../../../../contexts/AuthWrapper.tsx";
import { useMutation } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

// Mock `useAuth` and `useMutation`
vi.mock("../../../../contexts/AuthWrapper.tsx", () => ({
    useAuth: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
    useMutation: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe("CreateCourse Component", () => {
    const mockNavigate = vi.fn();
    const mockMutate = vi.fn();
    const mockUseAuth = {
        userData: {
            id: 1,
            name: "Test User",
            email: "test@example.com",
            aucId: "123",
            role: "instructor",
            createdAt: "2021-09-01T00:00:00.000Z",
        },
        token: "mock-token",
        isAuthenticated: true,
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();

        // Mock implementations
        vi.mocked(useAuth).mockReturnValue(mockUseAuth);
        vi.mocked(useMutation).mockReturnValue({
            mutate: mockMutate,
            isLoading: false,
            isError: false,
            data: null,
        });
        vi.mocked(require("react-router-dom").useNavigate).mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    const renderComponent = () =>
        render(
            <BrowserRouter>
                <CreateCourse />
            </BrowserRouter>
        );

    it("renders the CreateCourse component", () => {
        renderComponent();

        // Verify component elements
        expect(screen.getByText("Create a Course")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Software Engineering")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("30")).toBeInTheDocument();
        expect(screen.getByText("Publish Course")).toBeInTheDocument();
    });

    it("shows an error message when fields are empty", () => {
        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        renderComponent();

        // Click the publish button without filling fields
        fireEvent.click(screen.getByText("Publish Course"));

        expect(consoleErrorSpy).toHaveBeenCalledWith("Please fill in all fields");
        expect(mockMutate).not.toHaveBeenCalled();
    });

    it("calls createCourseMutation.mutate with correct data", () => {
        renderComponent();

        // Fill in the form fields
        fireEvent.change(screen.getByPlaceholderText("Software Engineering"), {
            target: { value: "Test Course" },
        });
        fireEvent.change(screen.getByPlaceholderText("30"), {
            target: { value: "50" },
        });

        // Click the publish button
        fireEvent.click(screen.getByText("Publish Course"));

        expect(mockMutate).toHaveBeenCalledWith({
            title: "Test Course",
            openForEnrollment: true,
            numStudents: 50,
            instructorId: 1,
        });
    });

    it("shows success modal after course creation", () => {
        // Update mock for success case
        vi.mocked(useMutation).mockReturnValue({
            mutate: mockMutate,
            isLoading: false,
            isError: false,
            data: {
                id: 123,
                title: "Test Course",
                enrollmentKey: "ENROLL123",
            },
        });

        renderComponent();

        // Fill in the form fields and click publish
        fireEvent.change(screen.getByPlaceholderText("Software Engineering"), {
            target: { value: "Test Course" },
        });
        fireEvent.change(screen.getByPlaceholderText("30"), {
            target: { value: "50" },
        });
        fireEvent.click(screen.getByText("Publish Course"));

        // Verify modal appears with course data
        expect(screen.getByText("Course Created Successfully!")).toBeInTheDocument();
        expect(screen.getByText("Course Enrollment key : ENROLL123")).toBeInTheDocument();
        expect(screen.getByText("Course Name: Test Course")).toBeInTheDocument();

        // Verify navigation button works
        fireEvent.click(screen.getByText("Go to Course"));
        expect(mockNavigate).toHaveBeenCalledWith("/course-info/123");
    });

    it("logs an error on failed mutation", () => {
        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        // Mock mutation failure
        vi.mocked(useMutation).mockReturnValue({
            mutate: mockMutate,
            isLoading: false,
            isError: true,
            data: null,
        });

        renderComponent();

        // Fill in fields and click publish
        fireEvent.change(screen.getByPlaceholderText("Software Engineering"), {
            target: { value: "Test Course" },
        });
        fireEvent.change(screen.getByPlaceholderText("30"), {
            target: { value: "50" },
        });
        fireEvent.click(screen.getByText("Publish Course"));

        // Expect error handling to occur
        expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to create course", expect.anything());
    });
});
