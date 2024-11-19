import React, { createContext, useContext, useState, ReactNode } from "react";

type Course = {
    id: number;
    openForEnrollment: boolean;
    enrollmentKey: string | null;
    title: string;
    numStudents: number;
    instructorId: number | null;
    createdAt: Date | null;
    updatedAt: Date;
    deletedAt: Date | null;
};

type CourseContextType = {
    courseData: Course | null;
    setCourseData: React.Dispatch<React.SetStateAction<Course | null>>;
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [courseData, setCourseData] = useState<Course | null>(null);

    return <CourseContext.Provider value={{ courseData, setCourseData }}>{children}</CourseContext.Provider>;
};

export const useCourseContext = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error("useCourseContext must be used within a CourseProvider");
    }
    return context;
};
