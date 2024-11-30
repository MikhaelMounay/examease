import React, { createContext, useContext, useState, ReactNode } from "react";

type Question = {
    id: number;
    type: string;
    prompt: string;
    options?: string[]; // For MCQs
    language?: string; // For coding questions
    isCodeSnippet?: boolean; // Whether it's a code snippet
    codeSnippet?: string; // The actual code snippet
    maxGrade: number;
};

type Exam = {
    id: number;
    title: string;
    maxGrade: number;
    duration: number; // Duration in minutes
    questions: Question[]; // Array of questions
    instructorId: number | null;
    createdAt: Date | null;
    updatedAt: Date;
    deletedAt: Date | null;
};

type ExamContextType = {
    examData: Exam | null;
    setExamData: React.Dispatch<React.SetStateAction<Exam | null>>;
};

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [examData, setExamData] = useState<Exam | null>(null);

    return <ExamContext.Provider value={{ examData, setExamData }}>{children}</ExamContext.Provider>;
};

export const useExamContext = () => {
    const context = useContext(ExamContext);
    if (!context) {
        throw new Error("useExamContext must be used within an ExamProvider");
    }
    return context;
};
